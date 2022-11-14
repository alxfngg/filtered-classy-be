import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IOffering extends Document {
  term: Types.ObjectId;
  period: Types.ObjectId;
  professors: Types.ObjectId[];

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const OfferingSchema: Schema = new Schema({
  term: { type: Schema.Types.ObjectId, ref: 'Term', required: true },
  period: { type: Schema.Types.ObjectId, ref: 'Period'},
  professors: [{type: Schema.Types.ObjectId, ref: 'Professor'}],

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const OfferingModel: Model<IOffering> = model<IOffering>('Offering', OfferingSchema);