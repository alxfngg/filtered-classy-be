import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IPeriod extends Document {
  // Code	Days	Start Time	End Time	X-Hour Day	X-Hour Start	X-Hour End
  code: string;
  days: string[];
  start: string;
  end: string;
  xhrDay: string;
  xhrStart: string;
  xhrEnd: string;

  createDate: Date;
  updatedDate: Date;
  timestamps?: {};
}

const PeriodSchema: Schema = new Schema({
  code: { type: String, required: true },
  days: [{ type: String, required: true }],
  start: { type: String, required: true },
  end: { type: String, required: true },
  xhrDay: { type: String, required: true },
  xhrStart: { type: String, required: true },
  xhrEnd: { type: String, required: true },
  
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const PeriodModel: Model<IPeriod> = model<IPeriod>('Period', PeriodSchema);