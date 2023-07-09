import { z } from 'zod';
import { userBloodGroup, userGender } from '../users/user.constant';

const updateStudentZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
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
  guardian: z
    .object({
      fatherName: z.string().optional(),
      fatherPhone: z.string().optional(),
      fatherOccupation: z.string().optional(),
      motherName: z.string().optional(),
      motherPhone: z.string().optional(),
      motherOccupation: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  localGuardian: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      occupation: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  profileImage: z.string().optional(),
  academicSemester: z.string().optional(),
  academicFaculty: z.string().optional(),
  academicDepartment: z.string().optional(),
});

export const studentValidation = { updateStudentZodSchema };
