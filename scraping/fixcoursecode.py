import pymongo
from pymongo import MongoClient, InsertOne

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.classy
collection = db.collection

courses = collection.find({})
for course in courses:
    print(course["courseCode"])

client.close()