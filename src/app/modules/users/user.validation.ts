import { z } from 'zod';
import { userBloodGroup, userGender } from './user.constant';

const createStudentZodSchema = z.object({
  user: z.object({ password: z.string().optional() }, { required_error: 'User is required' }),
  student: z.object(
    {
      name: z.object(
        {
          firstName: z.string({ required_error: 'First name is required' }),
          lastName: z.string({ required_error: 'Last name is required' }),
        },
        { required_error: 'Name is required' }
      ),
      email: z.string({ required_error: 'Email is required' }).email(),
      phone: z.string({ required_error: 'Phone is required' }),
      gender: z.enum([...userGender] as [string], { required_error: 'Gender is required' }),
      dob: z.coerce.date({ required_error: 'Date of Birth is required' }),
      bloodGroup: z.enum([...userBloodGroup] as [string]).optional(),
      presentAddress: z.string({ required_error: 'Address is required' }),
      permanentAddress: z.string({ required_error: 'Address is required' }),
      guardian: z.object(
        {
          fatherName: z.string({ required_error: 'Father name is required' }),
          fatherPhone: z.string({ required_error: 'Father phone is required' }),
          fatherOccupation: z.string({ required_error: 'Father occupation is required' }),
          motherName: z.string({ required_error: 'Mother name is required' }),
          motherPhone: z.string({ required_error: 'Mother phone is required' }),
          motherOccupation: z.string({ required_error: 'Mother occupation is required' }),
          address: z.string({ required_error: 'Address is required' }),
        },
        { required_error: 'Guardian is required' }
      ),
      localGuardian: z.object(
        {
          name: z.string({ required_error: 'Local guardian name is required' }),
          phone: z.string({ required_error: 'Local guardian phone is required' }),
          occupation: z.string({ required_error: 'Local guardian occupation is required' }),
          address: z.string({ required_error: 'Local guardian address is required' }),
        },
        { required_error: 'Local guardian is required' }
      ),
      profileImage: z.string().optional(),
      academicSemester: z.string({ required_error: 'Academic semester is required' }),
      academicFaculty: z.string({ required_error: 'Academic faculty is required' }),
      academicDepartment: z.string({ required_error: 'Academic department is required' }),
    },
    { required_error: 'Student is required' }
  ),
});

const createFacultyZodSchema = z.object({
  user: z.object({ password: z.string().optional() }, { required_error: 'User is required' }),
  faculty: z.object(
    {
      name: z.object(
        {
          firstName: z.string({ required_error: 'First name is required' }),
          middleName: z.string().optional(),
          lastName: z.string({ required_error: 'Last name is required' }),
        },
        { required_error: 'Name is required' }
      ),
      email: z.string({ required_error: 'Email is required' }).email(),
      phone: z.string({ required_error: 'Phone is required' }),
      gender: z.enum([...userGender] as [string], { required_error: 'Gender is required' }),
      dob: z.coerce.date({ required_error: 'Date of Birth is required' }),
      bloodGroup: z.enum([...userBloodGroup] as [string]).optional(),
      presentAddress: z.string({ required_error: 'Present address is required' }),
      permanentAddress: z.string({ required_error: 'Permanent address is required' }),
      designation: z.string({ required_error: 'Designation is required' }),
      profileImage: z.string().optional(),
      academicFaculty: z.string({ required_error: 'Academic faculty is required' }),
      academicDepartment: z.string({ required_error: 'Academic department is required' }),
    },
    { required_error: 'Faculty is required' }
  ),
});

const createAdminZodSchema = z.object({
  user: z.object({ password: z.string().optional() }, { required_error: 'User is required' }),
  admin: z.object(
    {
      name: z.object(
        {
          firstName: z.string({ required_error: 'First name is required' }),
          middleName: z.string().optional(),
          lastName: z.string({ required_error: 'Last name is required' }),
        },
        { required_error: 'Name is required' }
      ),
      email: z.string({ required_error: 'Email is required' }).email(),
      phone: z.string({ required_error: 'Phone is required' }),
      gender: z.enum([...userGender] as [string], { required_error: 'Gender is required' }),
      dob: z.coerce.date({ required_error: 'Date of Birth is required' }),
      bloodGroup: z.enum([...userBloodGroup] as [string]).optional(),
      presentAddress: z.string({ required_error: 'Present address is required' }),
      permanentAddress: z.string({ required_error: 'Permanent address is required' }),
      designation: z.string({ required_error: 'Designation is required' }),
      profileImage: z.string().optional(),
      managementDepartment: z.string({ required_error: 'Management department is required' }),
    },
    { required_error: 'Admin is required' }
  ),
});
export const userValidation = { createStudentZodSchema, createFacultyZodSchema, createAdminZodSchema };
