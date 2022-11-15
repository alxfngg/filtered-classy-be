import { CourseModel } from '../model/course.model';

export const getWaitlists = async () => {
    console.log("In getWaitlists");
    const courses = await CourseModel.aggregate( [ { $sample: { size: 5 } } ]);
    console.log('courses:::', courses);
    return {courses};
}