import { DepartmentModel } from '../model/department.model';

export const getDepartments = async () => {
    console.log("In getDepartments");
    const departments = await DepartmentModel.find({});
    console.log('departments:::', departments);
    return departments;
}

export const createDepartment = async (department: string) => {
    let data = {};
    try {
        console.log("In createDepartment");
        console.log('department in create department is: ', department);
        console.log(DepartmentModel);
        data = await DepartmentModel.create(department);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateDepartment = async (id: string, department: string) => {
    try {
        await DepartmentModel.findByIdAndUpdate(id, {
            department: department,
        }, { new: true }) as object;
        const updatedDepartment: object = await DepartmentModel.findById({ _id: id }) as object;
        return updatedDepartment;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteDepartment = async (id: string) => {
    try {
        let departmentDeleted: object = await DepartmentModel.findById(id) as object;
        let deletedCount: number = await (await DepartmentModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { departmentDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}