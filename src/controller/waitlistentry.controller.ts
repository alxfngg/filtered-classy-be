import { WaitlistEntryModel } from '../model/waitlistentry.model';

export const getWaitlistEntries = async () => {
    const waitlistEntries = await WaitlistEntryModel.find({});
    return waitlistEntries;
}

export const getWaitlistEntry = async (id: string) => {
    const waitlistEntry = await WaitlistEntryModel.find({id: id});
    return waitlistEntry;
}

export const createWaitlistEntry = async (waitlistEntry: string) => {
    let data = {};
    try {
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