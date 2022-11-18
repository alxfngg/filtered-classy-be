import { TermModel } from '../model/term.model';

export const getTerms = async () => {
    console.log("In getTerms");
    const terms = await TermModel.find({});
    console.log('terms:::', terms);
    return terms;
}

export const getTerm = async (id: string) => {
    console.log("In getTerm");
    const term = await TermModel.find({id: id});
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

export const updateTerm = async (id: string, term: object) => {
    try {
        await TermModel.findByIdAndUpdate(id, {
            term: term,
        }, { new: true }) as object;
        const updatedTerm: object = await TermModel.findById({ _id: id }) as object;
        return updatedTerm;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteTerm = async (id: string) => {
    try {
        let termDeleted: object = await TermModel.findById(id) as object;
        let deletedCount: number = await (await TermModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { termDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}