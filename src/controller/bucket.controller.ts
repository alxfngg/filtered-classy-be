import { BucketModel } from '../model/bucket.model';

export const getBuckets = async () => {
    const buckets = await BucketModel.find({});
    return buckets;
}

export const getBucket = async (id: string) => {
    const bucket = await BucketModel.findOne({id: id});
    return bucket;
}

export const createBucket = async (bucket: object) => {
    let data = {};
    try {
        data = await BucketModel.create(bucket);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateBucket = async (id: string, bucket: object) => {
    try {
        await BucketModel.findByIdAndUpdate(id, {
            bucket: bucket,
        }, { new: true }) as object;
        const updatedBucket: object = await BucketModel.findById({ _id: id }) as object;
        return updatedBucket;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteBucket = async (id: string) => {
    try {
        let bucketDeleted: object = await BucketModel.findById(id) as object;
        let deletedCount: number = await (await BucketModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { bucketDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}