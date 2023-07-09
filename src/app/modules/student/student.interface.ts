import { Model, Types } from 'mongoose';

type FullName = {
  firstName: string;
  lastName: string;
};

type Guardian = {
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  address: string;
};

type LocalGuardian = {
  name: string;
  phone: string;
  occupation: string;
  address: string;
};

export interface IStudent {
  studentId: string;
  name: FullName; // embedded object
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dob: Date;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian; // embedded object
  localGuardian: LocalGuardian; // embedded object
  profileImage: string;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
}

export type StudentModel = Model<IStudent, Record<string, unknown>>;
