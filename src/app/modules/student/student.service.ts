/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { ApiError } from '../../middlewares/globalErrorHandler';
import { User } from '../users/user.model';
import { studentSearchFields } from './student.constant';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IStudent[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = studentSearchFields;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filterFields).length) {
    andConditions.push({
      $and: Object.entries(filterFields).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }
  const whereCondition = andConditions.length ? { $and: andConditions } : {};
  const total = await Student.countDocuments(whereCondition);
  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getById = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ studentId: id });
  if (!isExist) {
    throw new ApiError(404, 'Student not found');
  }
  const result = await Student.findOne({ studentId: id })
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

const update = async (id: string, payload: IStudent): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ studentId: id });
  if (!isExist) {
    throw new ApiError(404, 'Student not found');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.firstName`
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fatherName`
      (updatedStudentData as any)[guardianKey] = guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.name`
      (updatedStudentData as any)[localGuardianKey] = localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate({ studentId: id }, updatedStudentData, { new: true });
  return result;
};

const deleteById = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ studentId: id });
  if (!isExist) {
    throw new ApiError(404, 'Student not found');
  }
  const session = await startSession();
  try {
    session.startTransaction();
    // Delete student from student collection first
    const result = await Student.findOneAndDelete({ studentId: id }, { session })
      .populate('academicSemester')
      .populate('academicFaculty')
      .populate('academicDepartment');
    if (!result) throw new ApiError(404, 'Failed to delete student');
    // Delete student from user collection
    await User.deleteOne({ id: id });
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const studentService = { getAll, getById, update, deleteById };
