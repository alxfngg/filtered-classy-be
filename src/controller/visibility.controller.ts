import { VisibilityGroupModel } from '../model/visibilityGroup.model';

export const getVisibilityGroups = async () => {
    console.log("In getVisibilityGroups");
    const visibilityGroups = await VisibilityGroupModel.find({});
    console.log('visibilityGroups:::', visibilityGroups);
    return visibilityGroups;
}

export const createVisibilityGroup = async (visibilityGroup: string) => {
    let data = {};
    try {
        console.log("In createVisibilityGroup");
        console.log('visibilityGroup in create visibilityGroup is: ', visibilityGroup);
        console.log(VisibilityGroupModel);
        data = await VisibilityGroupModel.create(visibilityGroup);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateVisibilityGroup = async (id: string, visibilityGroup: string) => {
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