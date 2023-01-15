import pymongo
from pymongo import MongoClient, InsertOne

def parse_profs(instructors, subject):
    for instructor in instructors:
        firstNameTokens = instructor.split(" ")[:-1]
        firstName = ' '.join(firstNameTokens)
        lastName = instructor.split(" ")[-1]
        name = {
                'firstName': firstName,
                'lastName': lastName
            }
        user = usercollection.update_one(
            name, {
                '$set':name
            }, upsert=True)
        user = usercollection.find_one(name)
        profcollection.update_one({
            'name': instructor,
            'user': user['_id']
        },{'$addToSet': { 'departments': subject } }, upsert=True)

def parse_timetable():
    with open("timetable.tsv", "r") as file:
        for line in file:
            values = line.strip().split("\t")
            print(values)
            subject = values[0]
            number = values[1]
            term = values[2]
            title = values[3]
            period = values[4]
            instructors = values[5].strip().split(",")
            wc = values[6]
            distrib = values[7].strip().split(" or ")
            if distrib[0] == "N/A":
                distrib = None
            xlist = values[8].strip().split(",")
            if xlist[0] != 'N/A':
                for index in range(len(xlist)):
                    tokens = xlist[index].split()
                    xlist[index] = f"{tokens[0]} {tokens[1]}"

            lang_req = values[9]
            nr = values[10]
            key = f"{subject} {number}"
            
            print('subject is', subject, "num is", number)
            try:
                course_id = coursecollection.find_one({
                    'courseDept': subject, 'courseNum': number
                })['_id']
            except:
                coursecollection.insert_one({
                    'courseDept': subject,
                    'courseNum': number, 
                    'courseTitle': title,
                    'xlists': xlist,
                    'distribs': distrib,
                    'worldCulture': wc,
                })

            offering = {
                'term': term,
                'period': period,
                'professors': instructors,
                'reviews': [],
                'waitlistOpen': True,
                'waitlist': [],
                'priorityWaitlist': []
            }
           
            coursecollection.update_one({'_id': course_id}, {
                '$addToSet': {'offerings': offering}            
                })
            
            if nr != 'N/A':
                coursecollection.update_one({'_id': course_id}, {
                '$set': {'nrEligible': True}            
            })

            if "7" in number:
                coursecollection.update_one({'_id': course_id}, {
                '$set': {'fys': True}            
            })

            if lang_req != 'N/A':
                coursecollection.update_one({'_id': course_id}, {
                '$set': {'language': lang_req}            
            })

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.test
coursecollection = db.courses
usercollection = db.users
profcollection = db.professors
deptcollection = db.departments
offeringscollection = db.offerings
termscollection = db.terms
periodscollection = db.periods

parse_timetable()

