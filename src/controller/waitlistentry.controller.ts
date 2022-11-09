import { WaitlistEntryModel } from '../model/waitlistentry.model';

export const getWaitlistEntries = async () => {
    console.log("In getWaitlistEntries");
    const waitlistEntries = await WaitlistEntryModel.find({});
    console.log('waitlistEntries:::', waitlistEntries);
    return waitlistEntries;
}

export const getWaitlistEntry = async (id: string) => {
    console.log("In getWaitlistEntry");
    const waitlistEntry = await WaitlistEntryModel.find({id: id});
    console.log('waitlistEntry:::', waitlistEntry);
    return waitlistEntry;
}

export const createWaitlistEntry = async (waitlistEntry: string) => {
    let data = {};
    try {
        console.log("In createWaitlistEntry");
        console.log('waitlistEntry in create waitlistEntry is: ', waitlistEntry);
        console.log(WaitlistEntryModel);
        data = await WaitlistEntryModel.create(waitlistEntry);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateWaitlistEntry = async (id: string, waitlistEntry: string) => {
    try {
        await WaitlistEntryModel.findByIdAndUpdate(id, {
            waitlistEntry: waitlistEntry,
        }, { new: true }) as object;
        const updatedWaitlistEntry: object = await WaitlistEntryModel.findById({ _id: id }) as object;
        return updatedWaitlistEntry;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteWaitlistEntry = async (id: string) => {
    try {
        let waitlistEntryDeleted: object = await WaitlistEntryModel.findById(id) as object;
        let deletedCount: number = await (await WaitlistEntryModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { waitlistEntryDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}