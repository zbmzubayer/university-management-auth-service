import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  academicFaculty: z.string({ required_error: 'Academic Faculty is required' }),
});

const updateAcademicDepartmentZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).optional(),
  description: z.string({ required_error: 'Description is required' }).optional(),
  academicFaculty: z.string({ required_error: 'Academic Faculty is required' }).optional(),
});

export const academicDepartmentValidation = { createAcademicDepartmentZodSchema, updateAcademicDepartmentZodSchema };
