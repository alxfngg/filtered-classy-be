import pycurl
from urllib.parse import urlencode

c = pycurl.Curl()
#initializing the request URL
c.setopt(c.URL, "http://localhost:8000/api/departments")
with open('dept.txt', 'r') as f:
    for line in f.readlines():
        #the data that we need to Post
        parsed = line.split(":")
        name = parsed[0]
        codes = parsed[1].split(",")
        post_data = {
            'name': name,
            'codes': codes
        }
        # encoding the string to be used as a query
        postfields = urlencode(post_data)
        #setting the cURL for POST operation
        c.setopt(c.POSTFIELDS, postfields)
        # perform file transfer
        c.perform()
#Ending the session and freeing the resources
c.close()