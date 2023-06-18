import { z } from 'zod';

const createUserZodSchema = z.object({
  role: z.string({ required_error: 'Role is required' }),
});

export const userValidation = { createUserZodSchema };
