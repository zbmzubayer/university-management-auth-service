import { Schema, model } from 'mongoose';
import { userBloodGroup, userGender } from '../users/user.constant';
import { IStudent } from './student.interface';

export const studentSchema = new Schema<IStudent>(
  {
    studentId: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: userGender },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, enum: userBloodGroup },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherPhone: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        motherName: { type: String, required: true },
        motherPhone: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    localGuardian: {
      type: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        occupation: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester', required: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty', required: true },
    academicDepartment: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment', required: true },
  },
  {
    timestamps: true,
  }
);

export const Student = model<IStudent>('Student', studentSchema);
