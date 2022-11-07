import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IVisibilityGroup extends Document {
  ownerUser: Types.ObjectId; // user that created the visibility group
  name: string; // name of visibility group
  users: Types.ObjectId[]; // users belonging to the visibility group
  

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const VisibilityGroupSchema: Schema = new Schema({
  ownerUser: {type: Schema.Types.ObjectId, ref: 'User', required: true }, // user that created the visibility group
  name: { type: String, required: true }, // name of visibility group
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }], // users belonging to the visibility group

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const VisibilityGroupModel: Model<IVisibilityGroup> = model<IVisibilityGroup>('VisibilityGroup', VisibilityGroupSchema);