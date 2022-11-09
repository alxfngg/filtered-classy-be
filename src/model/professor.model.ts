import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IProfessor extends Document {
  user: Types.ObjectId;
  departments: Types.ObjectId[]; // departments the professor belongs to
  coursesTaught: Types.ObjectId[]; // courses that the professor has taught

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const ProfessorSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department', required: true }], // professor's department
  coursesTaught: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // courses taught by the student
  
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const ProfessorModel: Model<IProfessor> = model<IProfessor>('Professor', ProfessorSchema);