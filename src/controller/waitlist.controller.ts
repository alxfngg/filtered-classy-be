import { CourseModel } from '../model/course.model';
import { StudentModel } from '../model/student.model';
import { UserModel } from '../model/user.model';

export const getWaitlists = async () => {
    console.log("In getWaitlists");
    const courses = await CourseModel.aggregate( [ { $sample: { size: 5 } } ]);
    const students = await StudentModel.find({}).populate('user')
    // console.log('courses:::', courses);
    // console.log('students:::', students);
    return {courses, students};
}