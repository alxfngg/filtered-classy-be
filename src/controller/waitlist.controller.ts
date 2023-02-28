import { CourseModel } from '../model/course.model';
import { StudentModel } from '../model/student.model';

export const getWaitlists = async () => {
    const studentId = '63c4424ce18e75a330906128';
    const student = await StudentModel.findOne({'_id': studentId}).populate('user')
    const courses = await CourseModel.find({
        '$or': [{'offerings.waitlist': studentId},
            {'offerings.priorityWaitlist': studentId}
        ]
    })
    const students = await StudentModel.find({}).populate('user')
    return {courses, student, students};
}

export const getWaitlist = async (dept: String, num: String) => {
    const studentId = '63c4424ce18e75a330906128';
    const student = await StudentModel.findOne({'_id': studentId}).populate('user')
    const course = await CourseModel.findOne({'courseDept': dept, 'courseNum': num});

    const onWaitlist = await CourseModel.findOne({
        'courseDept': dept, 
        'courseNum': num, 
        '$or': [
            {'offerings.waitlist': studentId},
            {'offerings.priorityWaitlist': studentId}
        ]
    }) !== null;

    const students = await StudentModel.find({}).populate('user')
    return {course, onWaitlist, student, students};
}

// add a student's waitlist entry for all terms they are interested in taking the course
export const joinWaitlists = async (dept: String, num: String, 
    studentId: String, offeringIndices: Array<String>, reason: String) => {
    const course = await CourseModel.findOne({'courseDept': dept, 'courseNum': num});
    await StudentModel.findByIdAndUpdate(studentId, {'waitlistReasons': {$push: {"waitlistReasons": {course: course?._id, reason: reason}}}})
    for (const offeringIndex of offeringIndices) {
        addToOneWaitlist(dept, num, studentId, offeringIndex);
    }
}

// remove a student's waitlist entry for a term
export const removeFromWaitlist = async (dept: String, num: String, 
    studentId: String, offeringIndex: String) => {
    const key: string = `offerings.${offeringIndex}.waitlist`;
    console.log(dept, num, studentId, offeringIndex);
    var query: { [key: string]: String; }  = {};
    query[key] = studentId;
    await CourseModel.updateOne(
        {'courseDept': dept, 'courseNum': num}, 
        { $pull: query}
    )

    const key2: string = `offerings.${offeringIndex}.priorityWaitlist`;
    query[key2] = studentId;
    await CourseModel.updateOne(
        {'courseDept': dept, 'courseNum': num}, 
        { $pull: query}
    )
}

// add an extra term on waitlist for those who have already submitted a waitlist request
export const addToOneWaitlist = async (dept: String, num: String, 
    studentId: String, offeringIndex: String) => {
    const key: string = `offerings.${offeringIndex}.waitlist`;
    var query: { [key: string]: String; }  = {};
    query[key] = studentId;
    return await CourseModel.updateOne(
        {'courseDept': dept, 'courseNum': num}, 
        { $addToSet: query}
    );
}

// remove all of a student's waitlist entries
export const withdrawFromWaitlist = async (dept: String, num: String, 
    studentId: String) => {
    console.log(dept, num, studentId);
    await CourseModel.updateMany(
        {'courseDept': dept, 'courseNum': num, "offerings.waitlist": studentId}, 
        { $pull: { "offerings.$.waitlist": studentId } }
    );

    await CourseModel.updateMany(
        {'courseDept': dept, 'courseNum': num, "offerings.priorityWaitlist": studentId}, 
        { $pull: { "offerings.$.priorityWaitlist": studentId } }
    )

    await CourseModel.updateMany(
        {'courseDept': dept, 'courseNum': num}, 
        { $pull: { "waitlistReasons": studentId } }
    )
}

export const prioritize = async (dept: String, num: String, 
    offeringIndex: String, studentId: String, priority: String) => {
    // to prioritize the student, we add them to the priority waitlist and remove them from the regular waitlist
    if (priority == 'false') {
        const updateQuery = {
            $addToSet: {
                [`offerings.${offeringIndex}.priorityWaitlist`]: studentId,
            },
            $pull: {
                [`offerings.${offeringIndex}.waitlist`]: studentId,
            },
        };
    
        await CourseModel.updateOne(
            {'courseDept': dept, 'courseNum': num}, 
            updateQuery
        );
    }  else {
        const updateQuery = {
            $addToSet: {
                [`offerings.${offeringIndex}.waitlist`]: studentId,
            },
            $pull: {
                [`offerings.${offeringIndex}.priorityWaitlist`]: studentId,
            },
        };
    
        await CourseModel.updateOne(
            {'courseDept': dept, 'courseNum': num},
            updateQuery
        );
    }
    return await CourseModel.findOne({'courseDept': dept, 'courseNum': num});    
}