import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IMajorMinor extends Document {
  name: string; // name of the major
  type: string; // major? minor? modified?
  requirements: Types.ObjectId[]; // requirements for this major

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const MajorMinorSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of the major
  type: { type: String, required: true }, // major, minor, or modified?
  requirements: [{ type: Schema.Types.ObjectId, ref: 'Requirement' }], // requirements for this major

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const MajorMinorModel: Model<IMajorMinor> = model<IMajorMinor>('MajorMinor', MajorMinorSchema);