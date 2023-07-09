import { Schema, model } from 'mongoose';
import { userBloodGroup, userGender } from '../users/user.constant';
import { IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    facultyId: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String, required: false },
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
    designation: { type: String, required: true },
    profileImage: {
      type: String,
      // required: true,
    },
    academicDepartment: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment', required: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty', required: true },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<IFaculty>('Faculty', facultySchema);
