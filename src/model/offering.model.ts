import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IOffering extends Document {
  dept: String,
  num: String,
  term: String,
  period: String,
  professors: Types.ObjectId[],

  createDate: Date;
  updatedDate: Date;
  timestamps?: {};
}

const OfferingSchema: Schema = new Schema({
  dept: { type: String, required: true },
  num: { type: String, required: true },
  term: { type: String, required: true },
  period: { type: String, required: true },
  professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const OfferingModel: Model<IOffering> = model<IOffering>('Offering', OfferingSchema);