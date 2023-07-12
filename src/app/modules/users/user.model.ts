import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
// Schema for the user model
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
    passwordChanged: {
      type: Boolean,
      default: false,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);
// Instance methods for the user
userSchema.methods.isUserExist = async function (id: string): Promise<Partial<IUser> | null> {
  return await User.findOne({ id });
};
userSchema.methods.isPasswordValid = async function (givenPassword: string, user: IUser): Promise<boolean> {
  if (!user.passwordChanged) {
    if (givenPassword === user.password) return true;
    else return false;
  }
  return await bcrypt.compare(givenPassword, user.password);
};
// Model for the user
export const User = model<IUser, UserModel>('User', userSchema);
