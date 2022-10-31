import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IMajor extends Document {
  name: string; // name of the major
  requirements: Types.ObjectId[]; // requirements for this major

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const MajorSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of the major
  requirements: [{ type: Schema.Types.ObjectId, ref: 'Requirement' }], // requirements for this major

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const MajorModel: Model<IMajor> = model<IMajor>('Major', MajorSchema);