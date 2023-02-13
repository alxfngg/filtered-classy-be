import { ReviewModel } from "../model/review.model";

export const createReview = async (review: object) => {
    let data = {};
    try {
        data = await ReviewModel.create(review);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const deleteReview = async (id: string) => {
    try {
        let ReviewDeleted: object = await ReviewModel.findById(id) as object;
        let deletedCount: number = await (await ReviewModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { ReviewDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}