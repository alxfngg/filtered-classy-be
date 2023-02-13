import { TermModel } from '../model/term.model';

export const getTerms = async () => {
    const terms = await TermModel.find({});
    return terms;
}

export const getTerm = async (code: string) => {
    const term = await TermModel.findOne({code: code});
    return term;
}

export const createTerm = async (term: object) => {
    let data = {};
    try {
        data = await TermModel.create(term);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateTerm = async (code: string, term: object) => {
    try {
        await TermModel.findOneAndUpdate({code: code}, {
            term: term,
        }, { new: true }) as object;
        const updatedTerm: object = await TermModel.findOne({ code: code }) as object;
        return updatedTerm;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteTerm = async (code: string) => {
    try {
        let termDeleted: object = await TermModel.findOne({code: code}) as object;
        let deletedCount: number = await (await TermModel.deleteOne({code: code})).deletedCount;
        if (deletedCount === 1) {
            return { termDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}