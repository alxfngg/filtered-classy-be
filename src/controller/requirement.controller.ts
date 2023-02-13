import { RequirementsModel } from '../model/requirement.model';

export const getRequirements = async () => {
    const requirements = await RequirementsModel.find({});
    return requirements;
}

export const getRequirement = async (id: string) => {
    const requirement = await RequirementsModel.findOne({id: id});
    return requirement;
}

export const createRequirement = async (requirement: object) => {
    let data = {};
    try {
        data = await RequirementsModel.create(requirement);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateRequirement = async (id: string, requirement: object) => {
    try {
        await RequirementsModel.findByIdAndUpdate(id, {
            requirement: requirement,
        }, { new: true }) as object;
        const updatedRequirement: object = await RequirementsModel.findById({ _id: id }) as object;
        return updatedRequirement;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteRequirement = async (id: string) => {
    try {
        let requirementDeleted: object = await RequirementsModel.findById(id) as object;
        let deletedCount: number = await (await RequirementsModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { requirementDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}