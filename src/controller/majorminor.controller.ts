import { MajorMinorModel } from '../model/majorminor.model';

export const getMajorMinors = async () => {
    console.log("In getMajorMinors");
    const majorMinors = await MajorMinorModel.find({});
    console.log('majorMinors:::', majorMinors);
    return majorMinors;
}

export const getMajorMinor = async (id: string) => {
    console.log("In getMajorMinor");
    const majorMinor = await MajorMinorModel.findOne({id: id});
    console.log('majorMinor:::', majorMinor);
    return majorMinor;
}

export const getMajors = async () => {
    console.log("In getMajors");
    const majors = await MajorMinorModel.find({type: "major"});
    console.log('majors:::', majors);
    return majors;
}

export const getMinors = async () => {
    console.log("In getMinors");
    const minors = await MajorMinorModel.find({type: "minor"});
    console.log('majors:::', minors);
    return minors;
}

export const createMajorMinor = async (major: object) => {
    let data = {};
    try {
        console.log("In createMajorMinor");
        console.log('major in create major is: ', major);
        console.log(MajorMinorModel);
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