import pymongo
from pymongo import MongoClient, InsertOne

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.classy
collection = db.collection

# courses = collection.find({})
# for course in courses:
#     dept = course['courseCode']['dept']
#     num = course['courseCode']['number']
#     collection.update_one({'courseCode': course['courseCode']}, {"$set": {"dept": dept, "num": num}})
#     collection.update_one({'courseCode': course['courseCode']}, {"$unset": {}})

collection.update_many({}, {"$unset": {"courseCode": 1}})

client.close()