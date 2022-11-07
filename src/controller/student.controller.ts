import { StudentModel } from '../model/student.model';

export const getStudents = async () => {
    console.log("In getStudents");
    const students = await StudentModel.find({});
    console.log('students:::', students);
    return students;
}

export const createStudent = async (student: string) => {
    let data = {};
    try {
        console.log("In createStudent");
        console.log('student in create student is: ', student);
        console.log(StudentModel);
        data = await StudentModel.create(student);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateStudent = async (id: string, student: string) => {
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