import { StudentModel } from '../model/student.model';

export const getStudents = async () => {
    console.log("In getStudents");
    const students = await StudentModel.find({});
    console.log('students:::', students);
    return students;
}

export const getCourseStudents = async (id: string) => {
    console.log("In getCourseStudents");
    const students = await StudentModel.find({coursesTaken: id});
    console.log('course students:::', students);
    return students;
}

export const getMajorStudents = async (id: string) => {
    console.log("In getMajorStudents");
    const students = await StudentModel.find({majors: id});
    console.log('major students:::', students);
    return students;
}

export const getMinorStudents = async (id: string) => {
    console.log("In getMinorStudents");
    const students = await StudentModel.find({minors: id});
    console.log('minor students:::', students);
    return students;
}

export const getFavProfsStudents = async (id: string) => {
    console.log("In getFavProfsStudents");
    const students = await StudentModel.find({favProfs: id});
    console.log('favorite profs students:::', students);
    return students;
}

export const getStudent = async (id: string) => {
    console.log("In getStudent");
    const student = await StudentModel.find({id: id})
    .populate('shoppingCart')
    .populate('currentCourses');
    console.log('student:::', student);
    return student;
}

export const createStudent = async (student: object) => {
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

export const updateStudent = async (id: string, student: object) => {
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