import pymongo

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.test
users = db.users
students = db.students


student_objects = [
    {
        "username": "alex",
        "email": "alex.feng.23@dartmouth.edu",
        "admin": True,
        "firstName": "Alex",
        "lastName": "Feng",
    }, 
    {
        "username": "alyssa",
        "email": "alyssa.k.anderson.23@dartmouth.edu",
        "admin": True,
        "firstName": "Alyssa",
        "lastName": "Anderson",
    },
    {
        "username": "gyuri",
        "email": "gyuri.hwang.23@dartmouth.edu",
        "admin": True,
        "firstName": "Gyuri",
        "lastName": "Hwang",
    },
    {
        "username": "henry",
        "email": "henry.kim.23@dartmouth.edu",
        "admin": True,
        "firstName": "Henry",
        "lastName": "Kim",
    },
    {
        "username": "vi",
        "email": "vi.n.tran.23@dartmouth.edu",
        "admin": True,
        "firstName": "Vi",
        "lastName": "Tran",
    }
]

users.insert_many(student_objects)

for user in student_objects:
    students.insert_one({
        "user": user['_id'],
        "classYear": 2023,
        "majors": ["Computer Science"]
        })

for student in student_objects:
    user = users.find_one(student)
    for student2 in student_objects:
        if student != student2:
            found_user = users.find_one(student)
            found_user_id = found_user['_id']
            found_student = students.find_one({"user": found_user_id})
            student_id = found_student['_id']

            found_user2 = users.find_one(student2)
            found_user_id2 = found_user2['_id']
            found_student2 = students.find_one({"user": found_user_id2})
            student_id2 = found_student2['_id']

            students.find_one_and_update(found_student, {"$push": {'friends': student_id2}})