import { model, Schema, Model, Document, Types } from 'mongoose';

export interface ICourseReview extends Document {
  student: Types.ObjectId; // student submitting review
  visibilityGroups: [Types.ObjectId]; // visibility groups that can read the review
  term: Types.ObjectId;
  professors: [Types.ObjectId];
  workload: number;
  quality: number;
  difficulty: number;
  content: string; // review content
  
  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const CourseReviewSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // student submitting review
  visibilityGroups: [{ type: Schema.Types.ObjectId, ref: 'VisibilityGroup'}], // review rating
  term: { type: Schema.Types.ObjectId, ref: 'Term', required: true },
  professors: [{ type: Schema.Types.ObjectId, ref: 'Professor', required: true}], // review rating
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