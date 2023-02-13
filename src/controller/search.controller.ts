import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';

export const getSearch = async () => {
    const courses = await CourseModel.aggregate( [ { $sample: { size: 3 } } ]);
    const departments = await DepartmentModel.find( {});
    return {courses, departments};
}