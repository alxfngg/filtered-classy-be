import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';
import { StudentModel } from '../model/student.model';
import { UserModel } from '../model/user.model';

export const getCourses = async () => {
    const courses = await CourseModel.find({});
    return courses;
}

export const getDeptCourses = async (dept: string) => {
    const department = await DepartmentModel.findOne({codes: dept});
    const courses = await CourseModel.find({courseDept: dept}).sort({'courseNum': 1}).collation({locale: "en_US", numericOrdering: true});
    return {department, courses};
}

const shuffleArray = (array: []) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  

export const getRandomCourses = async (num: number) => {
    var selectedCourses = await CourseModel.find({});
    selectedCourses.slice(0, num);
    return selectedCourses;
}

export const getCourse = async (dept: string, num: string) => {
    const course = await CourseModel.findOne({"courseDept": dept, "courseNum": num})
    .populate({
        path: 'offerings',
        populate: [
            {
                path: 'waitlist',
                populate: {
                    path: 'user',
                    model: 'User',
                    strictPopulate: false
                },
                strictPopulate: false
            },
            {
                path: 'priorityWaitlist',
                populate: {
                    path: 'user',
                    model: 'User',
                    strictPopulate: false
                },
                strictPopulate: false
            }
        ],
        strictPopulate: false
    });
    
    const studentId = '63c4424ce18e75a330906128';
    const student = await StudentModel.findOne({'_id': studentId}).populate('waitlistReasons')
    const onWaitlist = await CourseModel.findOne({
        'courseDept': dept, 
        'courseNum': num, 
        '$or': [
            {'offerings.waitlist': studentId},
            {'offerings.priorityWaitlist': studentId}
        ]
    }) !== null;
    const wroteReview = await CourseModel.findOne({courseDept: dept, courseNum: num, "offerings.reviews.user": studentId }) !== null;
    return {course, student, wroteReview, onWaitlist};
}

// use the same function for distrib and wc by specifying type
export const getDistribCourses = async (type: string, distrib: string) => {
    let courses = null;
    if (type.toLowerCase() === "distrib" || type.toLowerCase() === "distribs") {
        courses = await CourseModel.find({distribs: distrib});
    } else if (type.toLowerCase() === "wc") {
        courses = await CourseModel.find({wc: distrib});
    } else {
        console.log("Sorry, your query was not recognized. Please specify whether you want to query by distrib or world culture (wc).")
    }
    console.log('distrib courses:::', distrib, courses);
    return courses;
}

export const createCourse = async (course: object) => {
    let data = {};
    try {
        data = await CourseModel.create(course);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateCourse = async (dept: string, num: string, course: object) => {
    try {
        const query = {courseDept: dept, courseNum: num};
        await CourseModel.findOneAndUpdate(query, {
            course: course,
        }, { new: true }) as object;
        const updatedCourse: object = await CourseModel.findOne(query) as object;
        return updatedCourse;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteCourse = async (dept: string, num: string) => {
    try {
        const query = {courseDept: dept, courseNum: num};
        let courseDeleted: object = await CourseModel.findOne(query) as object;
        let deletedCount: number = await (await CourseModel.deleteOne(query)).deletedCount;
        if (deletedCount === 1) {
            return { courseDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}