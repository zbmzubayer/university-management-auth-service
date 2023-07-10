import { Types } from 'mongoose';
import { IManagementDepartment } from '../management-department/management-department.interface';

type FullName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export interface IAdmin {
  adminId: string;
  name: FullName;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dob: Date;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
}
