import { model, Schema, Model, Document, Types } from 'mongoose';

export interface ICourseReview extends Document {
  user: Types.ObjectId; // student submitting review
  visibilityGroups: [Types.ObjectId]; // visibility groups that can read the review
  dept: string;
  num: string;
  term: string;
  professors: string[];
  workload: number;
  quality: number;
  difficulty: number;
  content: string; // review content
  
  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const CourseReviewSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // student submitting review
  visibilityGroups: [{ type: Schema.Types.ObjectId, ref: 'VisibilityGroup'}], // review rating
  dept: { type: String, required: true },
  num: { type: String, required: true },
  term: { type: String, required: true },
  professors: [{ type: String, required: true}], // review rating
  workload: { type: Number, required: true }, // review rating
  quality: { type: Number, required: true }, // review rating
  difficulty: { type: Number, required: true }, // review rating
  content: { type: String, required: true }, // review content

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const CourseReviewModel: Model<ICourseReview> = model<ICourseReview>('CourseReview', CourseReviewSchema);