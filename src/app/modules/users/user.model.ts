import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

// Schema for the user model
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
  }
);
// Model for the user
export const User = model<IUser>('User', userSchema);
