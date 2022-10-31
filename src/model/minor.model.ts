import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IMinor extends Document {
  name: string; // name of the minor
  requirements: Types.ObjectId[]; // requirements for this minor

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const MinorSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of the minor
  requirements: [{ type: Schema.Types.ObjectId, ref: 'Requirement' }], // requirements for this minor

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const MinorModel: Model<IMinor> = model<IMinor>('Minor', MinorSchema);