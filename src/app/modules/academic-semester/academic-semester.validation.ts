import { z } from 'zod';
import { AcademicSemesterMonths, AcademicSemesterTitles } from './academic-semester.constants';

const createAcademicSemesterZodSchema = z.object({
  title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
    required_error: 'Title is required',
  }),
  year: z.string({ required_error: 'Year is required' }),
  startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
    required_error: 'Start month is required',
  }),
  endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
    required_error: 'End month is required',
  }),
});

export const academicSemesterValidation = { createAcademicSemesterZodSchema };
