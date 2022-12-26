import { model, Schema, Model, Document, Types } from 'mongoose';

export interface ICourse extends Document {
  courseDept: string; // code of the department
  courseNum: string; // course number
  title: string; // title of the course
  description: string; // description of the course
  required: string[][]; // prerequisites for this course
  counts: number[]; // prerequisites for this course
  distribs: string[]; // distribs for this course
  worldCulture: string;
  offerings: object[]; // terms offered for this course
  xlists: Types.ObjectId[]; // crosslisted courses
  pe: boolean; // pe for this course
  fys: boolean; // fys for this course
  language: string; // language for this course
  medians: {term: string, value: number}; // medians for this course
  avgMedian: number; // avg median for this course
  avgTimeCommitment: number; // avgTimeCommitment for this course
  avgDifficulty: number; // avgDifficulty for this course
  avgQuality: number; // avgQuality for this course
  waitlist: Types.ObjectId[]; // waitlist for this course
  reviews: Types.ObjectId[]; // reviews for this course
  syllabi: string[]; // syllabi for this course

  createDate: Date;
  updatedDate: Date;
  timestamps?: {};
}

const CourseSchema: Schema = new Schema({
  courseDept: { type: String, required: true }, // course dept
  courseNum: { type: String, required: true }, // course num
  title: { type: String, required: true }, // title of the course
  description: { type: String }, // description of the course
  required: [[{ type: String }]], // prerequisites for this course
  counts: [{ type: Number }], // number of prereqs required
  distribs: [{ type: String }], // distribs for this course
  worldCulture: { type: String }, // worldCulture for this course
  offerings: [{ type: Object }], // terms offered for this course
  xlists: [{ type: String }], // crosslisted courses
  pe: { type: Boolean, default: false }, // pe for this course
  fys: { type: Boolean, default: false }, // fys for this course
  language: { type: String, default: false }, // language for this course
  medians: { type: Object }, // medians for this course
  avgMedian: {type: Number},
//   layupListPage: { type: String, required: true }, // layupListPage for this course
  avgTimeCommitment: { type: Number }, // avgTimeCommitment for this course
  avgDifficulty: { type: Number }, // avgDifficulty for this course
  avgQuality: { type: Number }, // avgQuality for this course
  waitlist: [{ type: Schema.Types.ObjectId, ref: 'WaitlistEntry' }], // waitlist for this course
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // reviews for this course
  syllabi: [{ type: String, required: true }], // syllabi for this course

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const CourseModel: Model<ICourse> = model<ICourse>('Course', CourseSchema);