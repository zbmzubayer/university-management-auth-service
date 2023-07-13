import { z } from 'zod';

const loginZodSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

const refreshTokenZodSchema = z.object({
  refreshToken: z.string({ required_error: 'Refresh token is required' }),
});

const changePasswordZodSchema = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
});

export const authValidation = { loginZodSchema, refreshTokenZodSchema, changePasswordZodSchema };
