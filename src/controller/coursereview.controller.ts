import { CourseReviewModel } from '../model/coursereview.model';

export const getCourseReviews = async () => {
    console.log("In getCourseReviews");
    const courseReviews = await CourseReviewModel.find({});
    console.log('courseReviews:::', courseReviews);
    return courseReviews;
}

export const createCourseReview = async (courseReview: string) => {
    let data = {};
    try {
        console.log("In createCourseReview");
        console.log('courseReview in create courseReview is: ', courseReview);
        console.log(CourseReviewModel);
        data = await CourseReviewModel.create(courseReview);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateCourseReview = async (id: string, courseReview: string) => {
    try {
        await CourseReviewModel.findByIdAndUpdate(id, {
            courseReview: courseReview,
        }, { new: true }) as object;
        const updatedCourseReview: object = await CourseReviewModel.findById({ _id: id }) as object;
        return updatedCourseReview;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteCourseReview = async (id: string) => {
    try {
        let courseReviewDeleted: object = await CourseReviewModel.findById(id) as object;
        let deletedCount: number = await (await CourseReviewModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { courseReviewDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}