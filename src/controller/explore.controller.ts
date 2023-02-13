import { CourseModel } from '../model/course.model';
import { ProfessorModel } from '../model/professor.model';

export const getExplore = async () => {
    const courses = await CourseModel.aggregate( [ { $sample: { size: 5 } } ]);
    const professors = await ProfessorModel.aggregate( [ { $sample: { size: 5 } } ]);
    return {courses, professors};
}