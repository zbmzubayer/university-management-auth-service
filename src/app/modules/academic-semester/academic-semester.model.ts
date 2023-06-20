import { Schema, model } from 'mongoose';
import { ApiError } from '../../middlewares/globalErrorHandler';
import { AcademicSemesterCodes, AcademicSemesterMonths, AcademicSemesterTitles } from './academic-semester.constants';
import { IAcademicSemester } from './academic-semester.interface';

// Schema for the Academic Semester model
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitles,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodes,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

// Pre save hook to check if the Academic Semester already exist
// Validation - same year same semester cannot be created twice
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(409, 'Academic Semester already exist');
  }
  next();
});

// Model for the Academic Semester
export const AcademicSemester = model<IAcademicSemester>('AcademicSemester', academicSemesterSchema);
