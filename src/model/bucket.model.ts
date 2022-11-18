import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IBucket extends Document {
  name: string; // name of the major
  possibleCourses: Types.ObjectId[]; // requirements for this major
  requiredCount: number;

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const BucketSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of the major
  requirements: [{ type: Schema.Types.ObjectId, ref: 'Requirement' }], // requirements for this major

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const BucketModel: Model<IBucket> = model<IBucket>('Bucket', BucketSchema);