import { VisibilityGroupModel } from '../model/visibilitygroup.model';

export const getVisibilityGroups = async () => {
    const visibilityGroups = await VisibilityGroupModel.find({});
    return visibilityGroups;
}

export const getVisibilityGroup = async (id: string) => {
    const visibilityGroup = await VisibilityGroupModel.find({id: id});
    return visibilityGroup;
}

export const createVisibilityGroup = async (visibilityGroup: object) => {
    let data = {};
    try {
        data = await VisibilityGroupModel.create(visibilityGroup);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateVisibilityGroup = async (id: string, visibilityGroup: object) => {
    try {
        await VisibilityGroupModel.findByIdAndUpdate(id, {
            visibilityGroup: visibilityGroup,
        }, { new: true }) as object;
        const updatedVisibilityGroup: object = await VisibilityGroupModel.findById({ _id: id }) as object;
        return updatedVisibilityGroup;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteVisibilityGroup = async (id: string) => {
    try {
        let visibilityGroupDeleted: object = await VisibilityGroupModel.findById(id) as object;
        let deletedCount: number = await (await VisibilityGroupModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { visibilityGroupDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}