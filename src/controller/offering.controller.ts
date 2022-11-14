import { OfferingModel } from '../model/offering.model';

export const getOfferings = async () => {
    console.log("In getOfferings");
    const offerings = await OfferingModel.find({});
    console.log('offerings:::', offerings);
    return offerings;
}

export const getOffering = async (id: string) => {
    console.log("In getOffering");
    const offering = await OfferingModel.find({id: id});
    console.log('offering:::', offering);
    return offering;
}

export const createOffering = async (offering: object) => {
    let data = {};
    try {
        console.log("In createOffering");
        console.log('offering in create offering is: ', offering);
        console.log(OfferingModel);
        data = await OfferingModel.create(offering);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateOffering = async (id: string, offering: object) => {
    try {
        await OfferingModel.findByIdAndUpdate(id, {
            offering: offering,
        }, { new: true }) as object;
        const updatedOffering: object = await OfferingModel.findById({ _id: id }) as object;
        return updatedOffering;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteOffering = async (id: string) => {
    try {
        let offeringDeleted: object = await OfferingModel.findById(id) as object;
        let deletedCount: number = await (await OfferingModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { offeringDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}