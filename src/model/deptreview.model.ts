import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IDeptReview extends Document {
  student: Types.ObjectId; // student submitting review
  rating: number; // review rating
  content: string; // review content
  
  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const DeptReviewSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // student submitting review
  rating: { type: Number, required: true }, // review rating
  content: { type: String, required: true }, // review content

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const DeptReviewModel: Model<IDeptReview> = model<IDeptReview>('DeptReview', DeptReviewSchema);