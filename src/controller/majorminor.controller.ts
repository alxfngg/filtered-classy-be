import { MajorMinorModel } from '../model/majorminor.model';

export const getMajorMinors = async () => {
    const majorMinors = await MajorMinorModel.find({});
    return majorMinors;
}

export const getMajorMinor = async (id: string) => {
    const majorMinor = await MajorMinorModel.findOne({id: id});
    return majorMinor;
}

export const getMajors = async () => {
    const majors = await MajorMinorModel.find({type: "major"});
    return majors;
}

export const getMinors = async () => {
    const minors = await MajorMinorModel.find({type: "minor"});
    return minors;
}

export const createMajorMinor = async (major: object) => {
    let data = {};
    try {
        data = await MajorMinorModel.create(major);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateMajorMinor = async (id: string, major: object) => {
    try {
        await MajorMinorModel.findByIdAndUpdate(id, {
            major: major,
        }, { new: true }) as object;
        const updatedMajorMinor: object = await MajorMinorModel.findById({ _id: id }) as object;
        return updatedMajorMinor;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteMajorMinor = async (id: string) => {
    try {
        let majorDeleted: object = await MajorMinorModel.findById(id) as object;
        let deletedCount: number = await (await MajorMinorModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { majorDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}