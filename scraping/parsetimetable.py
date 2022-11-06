class Offering:
    def __init__(self, subject, number, title, wc, distrib, nr):
        self.subject = subject
        self.number = number
        self.title = title
        if wc != "N/A":
            self.wc = wc
        else:
            self.wc = None
        self.distrib = distrib
        self.offerings = []
        self.nr = nr
    
    def add_offering(self, term, instructors, period):
        self.offerings.append({"term": term, "instructors": instructors, "period": period})

    def __str__(self) -> str:
        return f"offerings: {self.offerings}"
    


def parse_timetable():
    courses = {}

    with open("timetable.tsv", "r") as file:
        for line in file:
            values = line.strip().split("\t")
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
            lang_req = values[9]
            nr = values[10]
            key = f"{subject} {number}"
            if key not in courses:
                courses[key] = Offering(subject, number, title, wc, distrib, nr == "NR Eligible")
            courses[key].add_offering(term, instructors, period)

    print(courses["COSC 10"])
    print(courses["COSC 25.01"])
    print(courses["COSC 52"])
    print(courses["COSC 98.01"])

parse_timetable()