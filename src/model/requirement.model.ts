import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IRequirements extends Document {
  prereqs: Types.ObjectId[]; // prereqs for the major/minor
  required: Types.ObjectId[]; // requirements for this major/minor
  buckets: Types.ObjectId[]; // buckets of courses for this major/minor
  courseCount: number;  // number of courses required for this major/minor
  
  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const RequirementsSchema: Schema = new Schema({
  prereqs: [{type: Schema.Types.ObjectId, ref: 'Course'}], // major/minor prereqs
  required: [{type: Schema.Types.ObjectId, ref: 'Course'}], // required courses for major/minor
  buckets: [{type: Schema.Types.ObjectId, ref: 'Bucket'}], // required buckets of courses for major/minor
  courseCount: {type: Number},

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const RequirementsModel: Model<IRequirements> = model<IRequirements>('Requirements', RequirementsSchema);