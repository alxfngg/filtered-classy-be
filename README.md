# Classy BE API

### Introduction

Classy BE API is a RESTful API that connects to classy FE web application. Classy is a web application that allows the user to look at course information, professor information, waitlist information, social aspects and more. The API is built using Node.js, Express, and MongoDB. The API is hosted on Heroku and the database is hosted on MongoDB Atlas.

### Project Support Features
1. Manage professor information
2. Manage student information
3. Manage course information
4. Manage user information
5. Manage waitlist information
6. Process recommendation information
7. Manage social aspect of the application

### Installation Guide
* You must have Node and yarn installed on your machine.
* The main branch is the branch we used to deploy
1. Clone this repository [here](https://github.com/dartmouth-cs98/classy-be.git).
2. Run `yarn install` to install all dependencies
3. Create an .env file in your project root folder and add your variables. See .env.sample for assistance. See pinned classy slack chat for the content
4. run `yarn dev` to start the server

### Repository Architecture
```
.
├── README.md
├── index.ts
├── package.json
├── scraping
│   ├── __pycache__
│   │   └── prereq.cpython-310.pyc
│   ├── fixcoursecode.py
│   ├── loadperiodsterms.py
│   ├── parsetimetable.py
│   ├── periods.csv
│   ├── prereq.py
│   ├── prereqs.txt
│   ├── scrape.py
│   ├── scrapemedians.py
│   ├── terms.csv
│   └── timetable.tsv
├── src
│   ├── app.ts
│   ├── controller
│   │   ├── bucket.controller.ts
│   │   ├── course.controller.ts
│   │   ├── coursereview.controller.ts
│   │   ├── department.controller.ts
│   │   ├── deptreview.controller.ts
│   │   ├── explore.controller.ts
│   │   ├── majorminor.controller.ts
│   │   ├── period.controller.ts
│   │   ├── professor.controller.ts
│   │   ├── requirement.controller.ts
│   │   ├── search.controller.ts
│   │   ├── student.controller.ts
│   │   ├── task.controller.ts
│   │   ├── term.controller.ts
│   │   ├── user.controller.ts
│   │   ├── visibilitygroup.controller.ts
│   │   ├── waitlist.controller.ts
│   │   └── waitlistentry.controller.ts
│   ├── data
│   │   ├── dept.txt
│   │   └── load.py
│   ├── db.config.ts
│   ├── model
│   │   ├── bucket.model.ts
│   │   ├── course.model.ts
│   │   ├── coursereview.model.ts
│   │   ├── department.model.ts
│   │   ├── deptreview.model.ts
│   │   ├── majorminor.model.ts
│   │   ├── period.model.ts
│   │   ├── professor.model.ts
│   │   ├── requirement.model.ts
│   │   ├── student.model.ts
│   │   ├── task.model.ts
│   │   ├── term.model.ts
│   │   ├── user.model.ts
│   │   ├── visibilitygroup.model.ts
│   │   └── waitlistentry.model.ts
│   └── router
│       └── api_router.ts
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

### API CRUD Operations (all models have the same operations)
| HTTP Verbs | Endpoints | Action | Body | Params |
| --- | --- | --- | --- | --- |
| GET | /api/tasks | To sign up a new user account | N/A | N/A |
| POST | /api/tasks/ | To login an existing user account | new Object  | N/A |
| PUT | /api/tasks/ | To create a new cause | id, new Object | N/A |
| DELETE | /api/tasks | To retrieve all causes on the platform | id | N/A |
| GET | /api/tasks | To retrieve details of a single cause | id | N/A |

### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
This project is available for use under the MIT License.

### Routes
See all available routes [here](https://docs.google.com/document/d/1a8CfnUn0UmRrMttx54xzE6VVQGUTuhpTS3rtg4iDz2s/edit?usp=sharing)
### Authors
* Vi Tran
* Gyuri Hwang
* Henry Kim
* Alex Feng
* Alyssa Anderson

