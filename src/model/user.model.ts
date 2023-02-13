import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  netID: string;
  password: string;
  admin: boolean;

  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  netID: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

UserSchema.pre('save', async function beforeUserSave(next) {
    // get access to the user model
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    try {
      // salt, hash, then set password to hash
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      return next();
    } catch (error: any) {
      return next(error);
    }
  });
  
  // note use of named function rather than arrow notation, required here
  UserSchema.methods.comparePassword = async function comparePassword(candidatePassword: string) {
    const comparison = await bcrypt.compare(candidatePassword, this.password);
    return comparison;
  };

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);