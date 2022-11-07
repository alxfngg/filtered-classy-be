import { RequirementsModel } from '../model/requirement.model';

export const getRequirements = async () => {
    console.log("In getRequirements");
    const requirements = await RequirementsModel.find({});
    console.log('requirements:::', requirements);
    return requirements;
}

export const createRequirement = async (requirement: string) => {
    let data = {};
    try {
        console.log("In createRequirement");
        console.log('requirement in create requirement is: ', requirement);
        console.log(RequirementsModel);
        data = await RequirementsModel.create(requirement);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateRequirement = async (id: string, requirement: string) => {
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