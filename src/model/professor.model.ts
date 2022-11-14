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
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }], // professor's department
  
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const ProfessorModel: Model<IProfessor> = model<IProfessor>('Professor', ProfessorSchema);