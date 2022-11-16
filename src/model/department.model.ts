import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  codes: string[];
  majors: Types.ObjectId[];
  minors: Types.ObjectId[];
  reviews: Types.ObjectId[]; // reviews for this department
  courses: Types.ObjectId[]; // courses for this department

  createDate: Date;
  updatedDate: Date;
  timestamps?: {};
}

const DepartmentSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of the department
  codes: [{ type: String, required: true }], // code of the department
  majors: [{ type: Schema.Types.ObjectId, ref: 'MajorMinor' }], // majors for this department
  minors: [{ type: Schema.Types.ObjectId, ref: 'MajorMinor' }], // minors for this department
  reviews: [{ type: Schema.Types.ObjectId, ref: 'DeptReview' }], // reviews for this department
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // courses for this department

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const DepartmentModel: Model<IDepartment> = model<IDepartment>('Department', DepartmentSchema);