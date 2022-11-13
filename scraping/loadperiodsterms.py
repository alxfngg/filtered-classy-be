import pymongo
from pymongo import MongoClient, InsertOne

client = pymongo.MongoClient("mongodb+srv://classyadmin:classyadmincs98@classy-cluster.kedlpk1.mongodb.net/?retryWrites=true&w=majority")
db = client.test
periods = db.periods
terms = db.terms

with open ('periods.csv', 'r') as file:
    for line in file.readlines():
        tokens = line.strip().split(",")
        period = {
            "code": tokens[0],
            "days": list(tokens[1]),
            "start": tokens[2],
            "end": tokens[3],
            "xhrDay": tokens[4],
            "xhrStart": tokens[5],
            "xhrEnd": tokens[6]
        }
        periods.insert_one(period)
        print(period)

with open ('terms.csv', 'r') as file:
    for line in file.readlines():
        tokens = line.strip().split(",")
        term = {
            "code": tokens[0],
            "year": int(tokens[1]),
            "season": tokens[2],
            "startDate": tokens[3],
            "endDate": tokens[4],
        }
        terms.insert_one(term)
        print(term)