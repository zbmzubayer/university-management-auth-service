import { Schema, model } from 'mongoose';
import { userBloodGroup, userGender } from '../users/user.constant';
import { IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin>(
  {
    adminId: { type: String, required: true, unique: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, required: false },
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: userGender },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, required: false, enum: userBloodGroup },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: {
      type: String,
      // required: false },
      designation: { type: String, required: true },
    },
    managementDepartment: { type: Schema.Types.ObjectId, required: true, ref: 'ManagementDepartment' },
  },
  { timestamps: true }
);

export const Admin = model<IAdmin>('Admin', adminSchema);
