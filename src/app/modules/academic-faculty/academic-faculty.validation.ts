import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
});

const updateAcademicFacultyZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).optional(),
  description: z.string({ required_error: 'Description is required' }).optional(),
});

export const academicFacultyValidation = { createAcademicFacultyZodSchema, updateAcademicFacultyZodSchema };
