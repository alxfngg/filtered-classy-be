"""
    prereq.py - code that parses processed prereq data, inspired by CS 50 TSE
    Author: Henry Kim
    Course: CS 98
    Term: Fall 2022
"""

with open("prereqs.txt", encoding = 'utf-8') as f:
    # perform file operations
    for line in f.readlines():
        parsed_line = line.strip().split( " : ")
        course_code = parsed_line[0]
        prereqs = parsed_line[1]
        recommended = None

        print(f"Course: {course_code}")
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
                # print('look', required[index])
                required[index] = required[index].split(" or ")
                for index2 in range(len(required[index])):
                    if required[index][index2][0] in "123456":
                        counts[index] = int(required[index][index2][0])
                        required[index][index2] = required[index][index2][2:]

        
        print(f"Required: {required}")
        print(f"Counts: {counts}")
        if recommended:
            print(f"Recommended: {recommended}")
        print()
