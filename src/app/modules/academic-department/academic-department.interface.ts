import { Types } from 'mongoose';
import { IAcademicFaculty } from '../academic-faculty/academic-faculty.interface';

export interface IAcademicDepartment {
  title: string;
  description: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
}
