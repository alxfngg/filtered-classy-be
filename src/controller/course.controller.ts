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