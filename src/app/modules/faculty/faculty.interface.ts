import { Types } from 'mongoose';
import { IAcademicDepartment } from '../academic-department/academic-department.interface';
import { IAcademicFaculty } from '../academic-faculty/academic-faculty.interface';

type FullName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface IFaculty {
  facultyId: string;
  name: FullName;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dob: Date;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  profileImage: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
}
