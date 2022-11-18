import { CourseModel } from '../model/course.model';
import { ProfessorModel } from '../model/professor.model';

export const getExplore = async () => {
    console.log("In getExplore");
    const courses = await CourseModel.aggregate( [ { $sample: { size: 5 } } ]);
    const professors = await ProfessorModel.aggregate( [ { $sample: { size: 5 } } ]);
    console.log('courses:::', courses);
    return {courses, professors};
}