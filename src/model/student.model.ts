import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  classYear: number; // class year of the student
  coursesTaken: Types.ObjectId[]; // courses taken by the student
  currentCourses: Types.ObjectId[]; // courses taken by the student
  shoppingCart: Types.ObjectId[]; // courses taken by the student
  onNextTerm: boolean;
  majors: Types.ObjectId[]; // majors of the student
  minors: Types.ObjectId[]; // minors of the student
  friends: Types.ObjectId[]; // friends of the student
  outgoingFriendRequests: Types.ObjectId[]; // friend requests sent
  incomingFriendRequests: Types.ObjectId[]; // friend requests received
  enemies: Types.ObjectId[]; // enemies of the student
  favProfs: Types.ObjectId[]; // favorite professors of the student
  visibilityGroups: Types.ObjectId[]; // visibility groups of the student 
  waitlistReasons: {course: Types.ObjectId, reason: string}; // waitlist for this course
  coursesRecommended: [{ course: Types.ObjectId, friend: Types.ObjectId }]; // courses recommended to the student
  createDate: Date,
  updatedDate: Date;
  timestamps?: {};
}

const StudentSchema: Schema = new Schema({
  classYear: { type: Number, required: true }, // class year of the student
  coursesTaken: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // courses taken by the student
  currentCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // currentCourses
  shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // shoppingCart
  majors: [{ type: Schema.Types.ObjectId, ref: 'Department' }], // majors of the student
  onNextTerm: [{ type: Boolean }], // majors of the student
  minors: [{ type: Schema.Types.ObjectId, ref: 'Department' }], // minors of the student
  friends: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // friends of the student
  outgoingFriendRequests: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // outgoing friend requests
  incomingFriendRequests: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // incoming friend requests
  enemies: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // enemies of the student
  favProfs: [{ type: Schema.Types.ObjectId, ref: 'Professor' }], // favorite professors of the student
  visibilityGroups: [{ type: Schema.Types.ObjectId, ref: 'VisibilityGroup' }], // visibility groups of the student
  waitlistReasons: [{ type: Object}], // waitlist for this course
  coursesRecommended: [{ course: { type: Schema.Types.ObjectId, ref: 'Course' }, friend: { type: Schema.Types.ObjectId, ref: 'Student' } }], // courses recommended to the student

  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date }
}
);

export const StudentModel: Model<IStudent> = model<IStudent>('Student', StudentSchema);