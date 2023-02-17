import { StudentModel } from '../model/student.model';
import { CourseModel } from '../model/course.model';

export const getStudents = async () => {
    const students = await StudentModel.find({});
    return students;
}

export const getCourseStudents = async (id: string) => {
    const students = await StudentModel.find({coursesTaken: id});
    return students;
}

export const getMajorStudents = async (id: string) => {
    const students = await StudentModel.find({majors: id});
    return students;
}

export const getMinorStudents = async (id: string) => {
    const students = await StudentModel.find({minors: id});
    return students;
}

export const getFavProfsStudents = async (id: string) => {
    const students = await StudentModel.find({favProfs: id});
    return students;
}

export const getStudent = async (id: string) => {
    console.log('received', id);
    const student = await StudentModel.findById(id)
    .populate('user')
    .populate('shoppingCart')
    .populate('currentCourses')
    .populate('coursesTaken');

    const waitlists = await CourseModel.find({
        '$or': [{'offerings.waitlist': `ObjectId('${id}')`},
            {'offerings.priorityWaitlist': `ObjectId('${id}')`}
        ]
    })
    return {student, waitlists};
}

export const createStudent = async (student: object) => {
    let data = {};
    try {
        data = await StudentModel.create(student);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateStudent = async (id: string, student: object) => {
    try {
        await StudentModel.findByIdAndUpdate(id, {
            student: student,
        }, { new: true }) as object;
        const updatedStudent: object = await StudentModel.findById({ _id: id }) as object;
        return updatedStudent;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteStudent = async (id: string) => {
    try {
        let studentDeleted: object = await StudentModel.findById(id) as object;
        let deletedCount: number = await (await StudentModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { studentDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const markAsTaken = async (studentId: string, courseId: string, taken: string) => {
    try {
        if (taken == 'false') {
            const res = await StudentModel.findByIdAndUpdate(studentId, {$addToSet: {coursesTaken: courseId}}).exec();
        } else {
            const res = await StudentModel.findByIdAndUpdate(studentId, {$pull: {coursesTaken: courseId}}).exec();
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const currentCourses = async (studentId: string, courseId: string, taking: string) => {
    try {
        if (taking == 'false') {
            console.log('false');
            const res = await StudentModel.findByIdAndUpdate(studentId, {$addToSet: {currentCourses: courseId}}).exec();
            console.log(res);
        } else {
            console.log('true');
            const res = await StudentModel.findByIdAndUpdate(studentId, {$pull: {currentCourses: courseId}}).exec();
            console.log(res);
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const shoppingCart = async (studentId: string, courseId: string, add: string) => {
    console.log('cart', studentId, courseId, add);
    try {
        if (add == 'false') {
            const res = await StudentModel.findByIdAndUpdate(studentId, {$addToSet: {shoppingCart: courseId}}).exec();
        } else {
            const res = await StudentModel.findByIdAndUpdate(studentId, {$pull: {shoppingCart: courseId}}).exec();
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}