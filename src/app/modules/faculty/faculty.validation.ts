import { z } from 'zod';
import { userBloodGroup, userGender } from '../users/user.constant';

const updateFacultyZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  gender: z.enum([...userGender] as [string]).optional(),
  dob: z.coerce.date().optional(),
  bloodGroup: z.enum([...userBloodGroup] as [string]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  designation: z.string().optional(),
  profileImage: z.string().optional(),
  academicFaculty: z.string().optional(),
  academicDepartment: z.string().optional(),
});

export const facultyValidation = { updateFacultyZodSchema };
