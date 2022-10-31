import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  classYear: number; // class year of the student
  coursesTaken: Types.ObjectId[]; // courses taken by the student
  reviews: Types.ObjectId[]; // reviews written by the student
  majors: Types.ObjectId[]; // majors of the student
  minors: Types.ObjectId[]; // minors of the student
  friends: Types.ObjectId[]; // friends of the student
  enemies: Types.ObjectId[]; // enemies of the student
  favProfs: Types.ObjectId[]; // favorite professors of the student
  gradeThreshold: number; // grade threshold of the student
  timeCommitment: number; // time commitment of the student
  exploration: number; // exploration of the student
  visibilityGroups: Types.ObjectId[]; // visibility groups of the student 

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const StudentSchema: Schema = new Schema({
  classYear: { type: Number, required: true }, // class year of the student
  coursesTaken: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // courses taken by the student
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // reviews written by the student
  majors: [{ type: Schema.Types.ObjectId, ref: 'Major' }], // majors of the student
  minors: [{ type: Schema.Types.ObjectId, ref: 'Minor' }], // minors of the student
  friends: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // friends of the student
  enemies: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // enemies of the student
  favProfs: [{ type: Schema.Types.ObjectId, ref: 'Professor' }], // favorite professors of the student
  gradeThreshold: { type: Number, required: true }, // grade threshold of the student
  timeCommitment: { type: Number, required: true }, // time commitment of the student
  exploration: { type: Number, required: true }, // exploration of the student
  visibilityGroups: [{ type: Schema.Types.ObjectId, ref: 'VisibilityGroup' }], // visibility groups of the student

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const StudentModel: Model<IStudent> = model<IStudent>('Student', StudentSchema);