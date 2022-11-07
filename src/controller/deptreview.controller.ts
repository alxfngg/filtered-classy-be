import { DeptReviewModel } from '../model/deptreview.model';

export const getDeptReviews = async () => {
    console.log("In getDeptReviews");
    const deptReviews = await DeptReviewModel.find({});
    console.log('deptReviews:::', deptReviews);
    return deptReviews;
}

export const createDeptReview = async (deptReview: string) => {
    let data = {};
    try {
        console.log("In createDeptReview");
        console.log('deptReview in create deptReview is: ', deptReview);
        console.log(DeptReviewModel);
        data = await DeptReviewModel.create(deptReview);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateDeptReview = async (id: string, deptReview: string) => {
    try {
        await DeptReviewModel.findByIdAndUpdate(id, {
            deptReview: deptReview,
        }, { new: true }) as object;
        const updatedDeptReview: object = await DeptReviewModel.findById({ _id: id }) as object;
        return updatedDeptReview;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteDeptReview = async (id: string) => {
    try {
        let deptReviewDeleted: object = await DeptReviewModel.findById(id) as object;
        let deletedCount: number = await (await DeptReviewModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { deptReviewDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}