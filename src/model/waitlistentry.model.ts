import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IWaitlistEntry extends Document {
  student: Types.ObjectId;
  offerings: [number];

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const WaitlistEntrySchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  offerings: [{ type: Number }],

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const WaitlistEntryModel: Model<IWaitlistEntry> = model<IWaitlistEntry>('WaitlistEntry', WaitlistEntrySchema);