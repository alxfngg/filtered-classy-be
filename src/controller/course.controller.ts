import { CourseModel } from '../model/course.model';

export const getCourses = async () => {
    console.log("In getCourses");
    const courses = await CourseModel.find({});
    console.log('courses:::', courses);
    return courses;
}

export const getCourse = async (id: string) => {
    console.log("In getCourse");
    const course = await CourseModel.findOne({id: id});
    console.log('course:::', course);
    return course;
}

export const getProfessorCourses = async (profId: string) => {
    console.log("In getProfessorCourses");
    const courses = await CourseModel.find({professors: profId});
    console.log('professor courses:::', courses);
    return courses;
}

// use the same function for distrib and wc by specifying type
export const getDistribCourses = async (type: string, distrib: string) => {
    console.log("In getDistribCourses");
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
        console.log("In createCourse");
        console.log('course in create course is: ', course);
        console.log(CourseModel);
        data = await CourseModel.create(course);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateCourse = async (id: string, course: object) => {
    try {
        await CourseModel.findByIdAndUpdate(id, {
            course: course,
        }, { new: true }) as object;
        const updatedCourse: object = await CourseModel.findById({ _id: id }) as object;
        return updatedCourse;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteCourse = async (id: string) => {
    try {
        let courseDeleted: object = await CourseModel.findById(id) as object;
        let deletedCount: number = await (await CourseModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { courseDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}