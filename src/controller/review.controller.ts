import { CourseModel } from "../model/course.model";
import { ReviewModel } from "../model/review.model";

export const createReview = async (courseId: string, offeringIndex: string, review: object) => {
    let data = {};
    try {
        const key: string = `offerings.${offeringIndex}.reviews`;
        var query: { [key: string]: Object; }  = {};
        query[key] = review;
        return await CourseModel.findByIdAndUpdate(courseId,
        { $addToSet: query}
    );
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