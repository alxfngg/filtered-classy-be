import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
//   username: string;
//   email: string;
//   password: string;

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);