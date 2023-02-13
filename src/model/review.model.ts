import { model, Schema, Model, Document, Types, ObjectId } from 'mongoose';

export interface IReview extends Document {
  student: Types.ObjectId;
  workload: number;
  difficulty: number;
  quality: number;
  review: number;

  createDate: Date;
  updatedDate: Date;
  timestamps?: {};
}

const ReviewSchema: Schema = new Schema({
  student: {type: Types.ObjectId, ref: 'Student'},
  workload: {type: Number},
  difficulty: {type: Number},
  quality: {type: Number},
  review: {type: Number},

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const ReviewModel: Model<IReview> = model<IReview>('Review', ReviewSchema);