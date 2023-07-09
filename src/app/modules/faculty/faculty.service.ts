/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { ApiError } from '../../middlewares/globalErrorHandler';
import { User } from '../users/user.model';
import { facultySearchFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IFaculty[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = facultySearchFields;
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
  const total = await Faculty.countDocuments(whereCondition);
  const result = await Faculty.find(whereCondition)
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

const getById = async (id: string): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ facultyId: id });
  if (!isExist) {
    throw new ApiError(404, 'Faculty not found');
  }
  const result = await Faculty.findOne({ facultyId: id }).populate('academicFaculty').populate('academicDepartment');
  return result;
};

const update = async (id: string, payload: IFaculty): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ facultyId: id });
  if (!isExist) {
    throw new ApiError(404, 'Faculty not found');
  }
  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>; // `name.firstName`
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ facultyId: id }, updatedFacultyData, { new: true });
  return result;
};

const deleteById = async (id: string): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ facultyId: id });
  if (!isExist) {
    throw new ApiError(404, 'Faculty not found');
  }
  const session = await startSession();
  try {
    session.startTransaction();
    // Delete faculty from faculty collection first
    const result = await Faculty.findOneAndDelete({ facultyId: id }, { session })
      .populate('academicFaculty')
      .populate('academicDepartment');
    if (!result) throw new ApiError(404, 'Failed to delete faculty');
    // Delete faculty from user collection
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

export const facultyService = { getAll, getById, update, deleteById };
