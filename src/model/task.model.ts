import { model, Schema, Model, Document } from 'mongoose';

export interface ITask extends Document {
  task: string;
  assignee: string;
  status: string;
  createDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  timestamps?: {};
}

const TaskSchema: Schema = new Schema({
  task: { type: String, required: true },
  assignee: { type: String, required: false },
  status: { type: String, required: false },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  createdBy: { type: String, required: false },
  updatedBy: { type: String, required: false },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const TaskModel: Model<ITask> = model<ITask>('Tasks', TaskSchema);