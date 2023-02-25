import { StudentModel } from '../model/student.model';
import mongoose, { ObjectId } from 'mongoose';

export const getStudents = async () => {
    const students = await StudentModel.find({});
    return students;
}

export const getCourseStudents = async (id: string) => {
    const students = await StudentModel.find({ coursesTaken: id });
    return students;
}

export const getMajorStudents = async (id: string) => {
    const students = await StudentModel.find({ majors: id });
    return students;
}

export const getMinorStudents = async (id: string) => {
    const students = await StudentModel.find({ minors: id });
    return students;
}

export const getFavProfsStudents = async (id: string) => {
    const students = await StudentModel.find({ favProfs: id });
    return students;
}

export const getStudent = async (id: string) => {
    const student = await StudentModel.findOne({ _id: id })
        .populate('shoppingCart')
        .populate('currentCourses')
        .populate({
            path: 'friends',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: { path: 'user' }
        })
        .populate({
            path: 'coursesRecommended',
            populate: { path: 'course' }
        })
        .populate({
            path: 'coursesRecommended',
            populate: {
                path: 'friend',
                populate: { path: 'user' }
            }
        })
        .populate('shoppingCart')
        .populate('user')
    return student;
}

export const getFriends = async (studentId: string) => {
    const student = await StudentModel.findOne({ _id: studentId })
        .populate({
            path: 'friends',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: { path: 'user' }
        });
    if (student) return student.friends;
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
    console.log(studentId, courseId, taken);
    try {
        if (taken == 'false') {
            console.log('false');
            const res = await StudentModel.findByIdAndUpdate(studentId, { $addToSet: { coursesTaken: courseId } }).exec();
            console.log(res);
        } else {
            console.log('true');
            const res = await StudentModel.findByIdAndUpdate(studentId, { $pull: { coursesTaken: courseId } }).exec();
            console.log(res);
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}