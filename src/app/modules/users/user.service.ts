import mongoose from 'mongoose';
import { ApiError } from '../../middlewares/globalErrorHandler';
import { AcademicSemester } from '../academic-semester/academic-semester.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generatePassword, generateStudentId } from './user.util';

const createStudent = async (user: IUser, student: IStudent): Promise<IUser | null> => {
  user.role = 'student';
  if (!user.password) user.password = generatePassword();
  const academicSemester = await AcademicSemester.findById(student.academicSemester);

  if (academicSemester) {
    const userId = await generateStudentId(academicSemester);
    user.id = userId;
  }
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    student.studentId = user.id;
    const createdStudent = await Student.create([student], { session });
    if (!createdStudent) throw new ApiError(500, 'Student not created');
    user.student = createdStudent[0]._id;
    const createdUser = await User.create([user], { session });
    if (!createdUser) throw new ApiError(500, 'User not created');
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw err;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (user: IUser, faculty: IFaculty): Promise<IUser | null> => {
  const userId = await generateFacultyId();
  user.id = userId;
  user.role = 'faculty';
  if (!user.password) user.password = generatePassword();
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    faculty.facultyId = user.id;
    const createdFaculty = await Faculty.create([faculty], { session });
    if (!createdFaculty) throw new ApiError(500, 'Faculty not created');
    user.faculty = createdFaculty[0]._id;
    const createdUser = await User.create([user], { session });
    if (!createdUser) throw new ApiError(500, 'User not created');
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw err;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

const createAdmin = async (user: IUser, admin: IAdmin): Promise<IUser | null> => {
  const userId = await generateAdminId();
  user.id = userId;
  user.role = 'admin';
  if (!user.password) user.password = generatePassword();
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    admin.adminId = user.id;
    const createdAdmin = await Admin.create([admin], { session });
    if (!createdAdmin) throw new ApiError(500, 'Admin not created');
    user.admin = createdAdmin[0]._id;
    const createdUser = await User.create([user], { session });
    if (!createdUser) throw new ApiError(500, 'User not created');
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw err;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment', // nested populate
        },
      ],
    });
  }
  return newUserAllData;
};

export const userService = { createStudent, createFaculty, createAdmin };
