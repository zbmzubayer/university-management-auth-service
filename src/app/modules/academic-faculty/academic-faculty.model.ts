import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academic-faculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<IAcademicFaculty>('AcademicFaculty', academicFacultySchema);
