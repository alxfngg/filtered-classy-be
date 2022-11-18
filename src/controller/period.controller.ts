import { PeriodModel } from '../model/period.model';

export const getPeriods = async () => {
    console.log("In getPeriods");
    const periods = await PeriodModel.find({});
    console.log('periods:::', periods);
    return periods;
}

export const getPeriod = async (id: string) => {
    console.log("In getPeriod");
    const period = await PeriodModel.find({id: id});
    console.log('period:::', period);
    return period;
}

export const createPeriod = async (period: object) => {
    let data = {};
    try {
        console.log("In createPeriod");
        console.log('period in create period is: ', period);
        console.log(PeriodModel);
        data = await PeriodModel.create(period);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updatePeriod = async (id: string, period: object) => {
    try {
        await PeriodModel.findByIdAndUpdate(id, {
            period: period,
        }, { new: true }) as object;
        const updatedPeriod: object = await PeriodModel.findById({ _id: id }) as object;
        return updatedPeriod;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deletePeriod = async (id: string) => {
    try {
        let periodDeleted: object = await PeriodModel.findById(id) as object;
        let deletedCount: number = await (await PeriodModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { periodDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}