import pymongo

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.test
coursecollection = db.courses
profcollection = db.professors
deptcollection = db.departments
offeringscollection = db.offerings
termscollection = db.terms
periodscollection = db.periods

with open("nextyearsched.tsv", "r") as file:
    for line in file:
        values = line.strip().split("\t")
        print(values)
        term = values[0]
        subject = values[1]
        number = values[2]
        title = values[3]
        instructors = values[4].strip().split(",")
        try:
            course_id = coursecollection.find_one({
                    'courseDept': subject, 'courseNum': number
                })['_id']
        except:
            coursecollection.insert_one({
                'courseDept': subject,
                'courseNum': number, 
                'courseTitle': title,
            })
            course_id = coursecollection.find_one({
                'courseDept': subject, 'courseNum': number
            })['_id']
        
        offering = {
                'term': term,
                'professors': instructors,
                'reviews': [],
                'waitlistOpen': True,
                'waitlist': [],
                'priorityWaitlist': []
            }
           
        coursecollection.update_one({'_id': course_id}, {
            '$addToSet': {'offerings': offering}            
            })