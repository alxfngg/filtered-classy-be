import { MinorModel } from '../model/minor.model';

export const getMinors = async () => {
    console.log("In getMinors");
    const minors = await MinorModel.find({});
    console.log('minors:::', minors);
    return minors;
}

export const createMinor = async (minor: string) => {
    let data = {};
    try {
        console.log("In createMinor");
        console.log('minor in create minor is: ', minor);
        console.log(MinorModel);
        data = await MinorModel.create(minor);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateMinor = async (id: string, minor: string) => {
    try {
        await MinorModel.findByIdAndUpdate(id, {
            minor: minor,
        }, { new: true }) as object;
        const updatedMinor: object = await MinorModel.findById({ _id: id }) as object;
        return updatedMinor;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteMinor = async (id: string) => {
    try {
        let minorDeleted: object = await MinorModel.findById(id) as object;
        let deletedCount: number = await (await MinorModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { minorDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}