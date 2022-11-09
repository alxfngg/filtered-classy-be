"""
    prereq.py - code that parses processed prereq data, inspired by CS 50 TSE
    Author: Henry Kim
    Course: CS 98
    Term: Fall 2022
"""
import json
import pymongo
from pymongo import MongoClient, InsertOne

def parse_prereqs():
    courses = []
    with open("prereqs.txt", encoding = 'utf-8') as f:
        # perform file operations
        for line in f.readlines():
            parsed_line = line.strip().split( " : ")
            course_code = parsed_line[0]
            prereqs = parsed_line[1]
            recommended = None

            if "recommended" in prereqs:
                parsed_prereqs = prereqs.split(". ")
                if len(parsed_prereqs) > 1:
                    required = parsed_prereqs[0].split(" and ")
                    for index in range(len(required)):
                        required[index] = required[index].split(" or ")
                recommended = parsed_prereqs[-1][:-12]
                recommended = recommended.split(" and ")
                recommended = recommended[0].split(" or ")
                    
            else:
                required = prereqs.split(" and ")
                counts = []
                for index in range(len(required)):
                    if required[index][0] in "23456":
                        counts.append(int(required[index][0]))
                        required[index] = required[index][2:]
                    else:
                        counts.append(1)
                    required[index] = required[index].split(" or ")
                    for index2 in range(len(required[index])):
                        if required[index][index2][0] in "123456":
                            counts[index] = int(required[index][index2][0])
                            required[index][index2] = required[index][index2][2:]

            course_prereqs = {
                "required": required,
                "counts": counts,
                "recommended": recommended 
            }
            course_prereqs = json.dumps(course_prereqs)
            print(course_prereqs)
            parsed = course_code.split()
            dept = parsed[0]
            number = parsed[1]
            print(collection.update_one(
                {"courseDept": dept, "courseNum": number},
                { "$set": { "required" : required, "counts": counts, "recommended": recommended } }))
            courses.append(course_prereqs)
        print()
    return courses

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.classy
collection = db.collection

parse_prereqs()