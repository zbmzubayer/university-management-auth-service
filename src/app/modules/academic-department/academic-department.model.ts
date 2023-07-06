import { Schema, model } from 'mongoose';
import { IAcademicDepartment } from './academic-department.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepartment = model<IAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
