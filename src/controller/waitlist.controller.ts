import { CourseModel } from '../model/course.model';
import { StudentModel } from '../model/student.model';

export const getWaitlists = async () => {
    console.log("In getWaitlists");
    const studentId = '63c4424ce18e75a330906128';
    const student = await StudentModel.findOne({'_id': studentId}).populate('user')
    const courses = await CourseModel.find({'offerings.waitlist': `ObjectId('${studentId}')`})
    const students = await StudentModel.find({}).populate('user')
    return {courses, student, students};
}

export const getWaitlist = async (dept: String, num: String) => {
    console.log("In getWaitlist");
    const studentId = '63c4424ce18e75a330906128';
    const student = await StudentModel.findOne({'_id': studentId}).populate('user')
    const course = await CourseModel.findOne({'courseDept': dept, 'courseNum': num});

    const onWaitlist = await CourseModel.findOne({
        'courseDept': dept, 
        'courseNum': num, 
        'offerings.waitlist': `ObjectId('${studentId}')`
    }) !== null;
    
    const students = await StudentModel.find({}).populate('user')
    return {course, onWaitlist, student, students};
}

// add a student's waitlist entry for all terms they are interested in taking the course
export const addToWaitlist = async (dept: String, num: String, 
    studentId: String, terms: Array<String>) => {
    console.log("In addToWaitlist");
    for (const term in terms) {
        await CourseModel.updateOne({'courseDept': dept, 'courseNum': num}, { $push: { 'offerings.term': term, 'offerings.waitlist': `ObjectId('${studentId}')`}})
    }
}

// remove a student's waitlist entry for a term
export const removeFromWaitlist = async (dept: String, num: String, 
    studentId: String, term: String) => {
    console.log("In removeFromWaitlist");
    await CourseModel.updateOne(
        {'courseDept': dept, 'courseNum': num}, 
        { $pull: { 'offerings.term': term, 'offerings.waitlist': `ObjectId('${studentId}')`}}
    )
}

// remove all of a student's waitlist entries
export const withdrawFromWaitlist = async (dept: String, num: String, 
    studentId: String) => {
    console.log("In removeFromWaitlist");
    await CourseModel.updateOne(
        {'courseDept': dept, 'courseNum': num}, 
        { $pull: { 'offerings.waitlist': `ObjectId('${studentId}')`}}
    )
}