/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { ApiError } from '../../middlewares/globalErrorHandler';
import { User } from '../users/user.model';
import { adminSearchFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IAdmin[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = adminSearchFields;
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
  const total = await Admin.countDocuments(whereCondition);
  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getById = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ adminId: id });
  if (!isExist) {
    throw new ApiError(404, 'Admin not found');
  }
  const result = await Admin.findOne({ adminId: id }).populate('managementDepartment');
  return result;
};

const update = async (id: string, payload: IAdmin): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ adminId: id });
  if (!isExist) {
    throw new ApiError(404, 'Admin not found');
  }
  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IAdmin> = { ...facultyData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>; // `name.firstName`
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ adminId: id }, updatedFacultyData, { new: true });
  return result;
};

const deleteById = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ adminId: id });
  if (!isExist) {
    throw new ApiError(404, 'Admin not found');
  }
  const session = await startSession();
  try {
    session.startTransaction();
    // Delete admin from admin collection first
    const result = await Admin.findOneAndDelete({ adminId: id }, { session }).populate('managementDepartment');
    if (!result) throw new ApiError(404, 'Failed to delete admin');
    // Delete admin from user collection
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

export const adminService = { getAll, getById, update, deleteById };
