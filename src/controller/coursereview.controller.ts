import { CourseReviewModel } from '../model/coursereview.model';

export const getAllCourseReviews = async () => {
    console.log("In getAllCourseReviews");
    const courseReviews = await CourseReviewModel.find({});
    console.log('courseReviews:::', courseReviews);
    return courseReviews;
}

export const getCourseReviews = async (dept: string, num: string) => {
    const query = {dept: dept, num: num};
    console.log("In getCourseReview");
    const courseReview = await CourseReviewModel.findOne(query);
    console.log('coursereview:::', courseReview);
    return courseReview;
}


export const getCourseReview = async (id: string) => {
    console.log("In getCourseReview");
    const courseReview = await CourseReviewModel.findOne({id: id});
    console.log('coursereview:::', courseReview);
    return courseReview;
}

export const createCourseReview = async (courseReview: object) => {
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

export const updateCourseReview = async (id: string, courseReview: object) => {
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