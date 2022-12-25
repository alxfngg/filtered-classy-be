import { model, Schema, Model, Document } from 'mongoose';

export interface IOffering extends Document {
  dept: string;
  num: string;
  term: string;
  period: string;
  professors: string[];

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const OfferingSchema: Schema = new Schema({
  dept: { type: String, required: true },
  num: { type: String, required: true },
  term: { type: String },
  period: { type: String },
  professors: [{ type: String }],

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const OfferingModel: Model<IOffering> = model<IOffering>('Offering', OfferingSchema);