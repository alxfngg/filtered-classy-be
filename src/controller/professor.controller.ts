import { CourseModel } from '../model/course.model';
import { ProfessorModel } from '../model/professor.model';

export const getProfessors = async () => {
    const professors = await ProfessorModel.find({});
    return professors;
}

export const getDeptProfessors = async (code: string) => {
    const professors = await ProfessorModel.find({departments: code});
    return professors;
}

export const getProfessor = async (name: string) => {
    const professor = await ProfessorModel.findOne({name: name}).populate('user');
    const courses = await CourseModel.find({'offerings.professors': name})
    return {professor, courses};
}

export const createProfessor = async (professor: object) => {
    let data = {};
    try {
        data = await ProfessorModel.create(professor);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateProfessor = async (name: string, professor: object) => {
    try {
        await ProfessorModel.findOneAndUpdate({name: name}, {
            professor: professor,
        }, { new: true }) as object;
        const updatedProfessor: object = await ProfessorModel.findOne({name: name}) as object;
        return updatedProfessor;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteProfessor = async (name: string) => {
    try {
        let professorDeleted: object = await ProfessorModel.findOne({name: name}) as object;
        let deletedCount: number = await (await ProfessorModel.deleteOne({name: name})).deletedCount;
        if (deletedCount === 1) {
            return { professorDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}