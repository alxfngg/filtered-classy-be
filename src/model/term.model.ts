import { model, Schema, Model, Document } from 'mongoose';

export interface ITerm extends Document {
  year: number;
  season: string;
  startDate: Date;
  endDate: Date;

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const TermSchema: Schema = new Schema({
  year: { type: Number, required: true },
  season: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const TermModel: Model<ITerm> = model<ITerm>('Term', TermSchema);