import { MajorModel } from '../model/major.model';

export const getMajors = async () => {
    console.log("In getMajors");
    const majors = await MajorModel.find({});
    console.log('majors:::', majors);
    return majors;
}

export const createMajor = async (major: string) => {
    let data = {};
    try {
        console.log("In createMajor");
        console.log('major in create major is: ', major);
        console.log(MajorModel);
        data = await MajorModel.create(major);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateMajor = async (id: string, major: string) => {
    try {
        await MajorModel.findByIdAndUpdate(id, {
            major: major,
        }, { new: true }) as object;
        const updatedMajor: object = await MajorModel.findById({ _id: id }) as object;
        return updatedMajor;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteMajor = async (id: string) => {
    try {
        let majorDeleted: object = await MajorModel.findById(id) as object;
        let deletedCount: number = await (await MajorModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { majorDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}