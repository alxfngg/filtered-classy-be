import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IProfessor extends Document {
  name: string;
  user: Types.ObjectId;
  departments: string[]; // departments the professor belongs to

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const ProfessorSchema: Schema = new Schema({
  name: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  departments: [{ type: String }], // professor's department
  
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const ProfessorModel: Model<IProfessor> = model<IProfessor>('Professor', ProfessorSchema);