import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IWaitlistEntry extends Document {
  student: Types.ObjectId;
  terms: Types.ObjectId[];
  priority: number;

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const WaitlistEntrySchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  terms: [{ type: Schema.Types.ObjectId, ref: 'Term', required: true }],
  priority: { type: Number },

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const WaitlistEntryModel: Model<IWaitlistEntry> = model<IWaitlistEntry>('WaitlistEntry', WaitlistEntrySchema);