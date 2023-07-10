import { z } from 'zod';

const createManagementDepartmentZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
});

const updateManagementDepartmentZodSchema = z.object({
  title: z.string().optional(),
});

export const managementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
};
