import { CourseModel } from '../model/course.model';
import { DepartmentModel } from '../model/department.model';

export const getSearch = async () => {
    console.log("In getSearch");
    const courses = await CourseModel.aggregate( [ { $sample: { size: 3 } } ]);
    const departments = await DepartmentModel.find( {});
    console.log('courses:::', courses);
    return {courses, departments};
}