import { TermModel } from '../model/term.model';

export const getTerms = async () => {
    console.log("In getTerms");
    const terms = await TermModel.find({});
    console.log('terms:::', terms);
    return terms;
}

export const getTerm = async (code: string) => {
    console.log("In getTerm");
    const term = await TermModel.findOne({code: code});
    console.log('term:::', term);
    return term;
}

export const createTerm = async (term: object) => {
    let data = {};
    try {
        console.log("In createTerm");
        console.log('term in create term is: ', term);
        console.log(TermModel);
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
        const updatedTerm: object = await TermModel.findOne({code: code}) as object;
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