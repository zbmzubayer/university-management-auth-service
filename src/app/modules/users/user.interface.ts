/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export interface IUser {
  id: string;
  role: string;
  password: string;
  passwordChanged: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
}

export interface IUserMethods {
  isUserExist: (id: string) => Promise<Partial<IUser> | null>;
  isPasswordValid: (givenPassword: string, user: IUser) => Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
