"""
    scrape.py - code that scrapes the ORC course pages for Classy, a CS 98 project
    Author: Henry Kim
    Course: CS 98
    Term: Fall 2022
"""

import requests
import json
import re
from bs4 import BeautifulSoup
import pymongo
from pymongo import MongoClient, InsertOne

ROOT_URL = "https://dartmouth.smartcatalogiq.com/"
previous_subject = None

def get_course_name(soup: BeautifulSoup, selector1: str, selector2: str):
    """
    retrieves and returns the course name on the ORC page, which consists of a department, number, and title. 
    Each value is returned as a string
    with department and number nested together within a dictionary.
    """
    global previous_subject
    course_number = soup.select(selector1)[0].contents[0].split()
    if len(course_number) != 2:
        course_dept = previous_subject
        course_number = course_number[0]
    else:
        course_dept = course_number[0]
        previous_subject = course_dept
        course_number = course_number[1]
    courseTitle = soup.select(selector2)[0].contents[2].strip()
    courseCode = {
        'dept': course_dept,
        'number': course_number,
    }
    return courseCode, courseTitle

def get_course_description(soup: BeautifulSoup, selector: str) -> str:
    """retrieves and returns the description on the ORC course page as a string"""
    paragraphs = soup.select(selector)
    if len(paragraphs) == 0:
        return ""
    for index in range(len(paragraphs)):
        paragraphs[index] = paragraphs[index].get_text().strip()
    return ' '.join(paragraphs)

def get_professors(soup: BeautifulSoup, selector: str) -> list[str]:
    """retrieves and returns the professors on the ORC course page as a list of strings"""
    professors = soup.select(selector)
    if len(professors) == 0:
        return []
    instructor_string = professors[0].get_text()[len("Instructor"):]
    
    delimiters = ["or", "and", ",", "/"]
    for delimiter in delimiters:
        professors = instructor_string.split(delimiter)
        if len(professors) > 1:
            break
    
    for index in range(len(professors)):
        professors[index] = professors[index].strip()
    return professors

def get_xlists(soup: BeautifulSoup, selector: str) -> list[str]:
    """retrieves and returns crosslisted courses on the ORC course page as a list of strings"""
    xlists = soup.select(selector)[0].get_text()
    target = "Cross Listed Courses"
    if target not in xlists:
        return []
    target_index = xlists.index(target) + len(target)
    xlists = xlists[target_index:]
    try:
        end_index = xlists.index('Prerequisites')
    except:
        try:
            end_index = xlists.index('Degree Requirement Attributes')
        except:
            end_index = xlists.index('The Timetable of Class Meetings')
    xlists = xlists[:end_index].strip()
    courses = list(re.finditer(r"[A-Z]{3,4} [0-9]{1,3}\.?[0-9]{0,2}", xlists))
    xlist_courses = []
    for course in courses:
        xlist_courses.append(course.group())
    return xlist_courses


def get_prereqs(soup: BeautifulSoup, selector: str) -> list[str]:
    """retrieves and returns the prereqs on the ORC course page as a list of strings"""
    prereqs = soup.select(selector)[0].get_text()
    try:
        prereqs = prereqs[prereqs.index("Prerequisite")+len("Prerequisite"):].strip()
        return prereqs
    except:
        return []

def get_distribs_wc(soup: BeautifulSoup, selector: str):
    """
    retrieves and returns the distribs and world cultures on the ORC course page 
    as a list of strings (possible distribs) and a string (WC if applicable)
    """
    distribs = soup.select(selector)
    wc = None
    # some classes have no distribs or WCs
    if len(distribs) == 0:
        return [], wc
    
    # handle classes with WCs
    distribs = distribs[0].contents[0].split("; ")
    if len(distribs) == 2:
        wc = distribs[1][distribs[1].index(":")+1:]
    
    # handle classes with multiple possible distribs (e.g., INT or LIT)
    try:
        distribs = distribs[0][distribs[0].index(":")+1:]
        distribs = distribs.split(" or ")
    except:
        distribs = [distribs[0]]
    
    return distribs, wc

def get_offered_terms(soup: BeautifulSoup, selector: str) -> list[str]:
    """retrieves and returns the terms that a course is offered on the ORC course page as a list of strings"""
    offered_terms = soup.select(selector)
    for index in range(len(offered_terms)):
        offered_terms[index] = offered_terms[index].contents[0]
    return offered_terms

def scrape_course_page(root_url: str, link: str):
    """
    scrapes a course page and returns a json of the course properties
    """
    page = requests.get(f"{root_url}{link}")
    soup = BeautifulSoup(page.content, "html.parser")
    # on course page
    courseCode, courseTitle = get_course_name(soup, "h1 span", "h1")
    course_description = get_course_description(soup, "#main .desc p")
    professors = get_professors(soup, "#instructor")
    xlists = get_xlists(soup, "#main")
    prereqs = get_prereqs(soup, ".sc_prereqs")
    distribs, wc = get_distribs_wc(soup, ".sc-extrafield p")
    offered_terms = get_offered_terms(soup, '#main .offered li')

    course = {
        'courseCode': courseCode,
        'courseTitle': courseTitle,
        'description': course_description,
        'xlists': xlists,
        # 'prereqs': prereqs,
        'professors': professors,
        'distribs': distribs,
        'worldCulture': wc,
        'termsOffered': offered_terms,
    }

    # if prereqs:
    #     print(courseCode['course_dept'], courseCode['course_number'], ":", prereqs)

    course_json = json.dumps(course)
    if course['courseCode']['dept'] == 'COSC': 
        print(course_json)
    else:
        print(course['courseCode'])
    return course_json

def scrape_course_pages(root_url: str, soup: BeautifulSoup):
    # find the courses links
    courses_links = soup.select("#sc-programlinks > ul > li > p > a")
    # some departments have multiple programs (e.g., Spanish and Portuguese have Spanish courses and Portuguese courses)
    for link in courses_links:
        # find each course link
        page = requests.get(f"{root_url}{link['href']}")
        soup = BeautifulSoup(page.content, "html.parser")
        courses = soup.select("#main > ul > li > a")
        for course in courses:
            link = course['href']
            course_json = scrape_course_page(root_url, link)
            print("HELLO")
            print(course_json)


def scrape_dept_pages(root_url: str, seed: str, func = None):
    # start with the page listing all departments
    page = requests.get(f"{root_url}{seed}")
    soup = BeautifulSoup(page.content, "html.parser")
    departments = soup.select("#sc-programlinks a")
    for department in departments:
        # extract the department page link
        title = department.contents[0]
        link = department['href']
        page = requests.get(f"{root_url}{link}")
        soup = BeautifulSoup(page.content, "html.parser")
        if func is not None:
            func(root_url, soup)

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.classy
collection = db.collection
requesting = []

scrape_dept_pages(ROOT_URL, "current/orc/Departments-Programs-Undergraduate", scrape_course_pages)

result = collection.bulk_write(requesting)
client.close()