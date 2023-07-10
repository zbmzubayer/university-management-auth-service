import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { managementDepartmentSearchFields } from './management-department.constant';
import { IManagementDepartment } from './management-department.interface';
import { ManagementDepartment } from './management-department.model';

const create = async (payload: IManagementDepartment): Promise<IManagementDepartment> => {
  const createdManagementDepartment = ManagementDepartment.create(payload);
  return createdManagementDepartment;
};

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IManagementDepartment[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = managementDepartmentSearchFields;
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
  const total = await ManagementDepartment.countDocuments(whereCondition);
  const result = await ManagementDepartment.find(whereCondition).sort(sortCondition).skip(skip).limit(limit);
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getById = async (id: string): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const update = async (id: string, payload: IManagementDepartment): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

const deleteById = async (id: string): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const managementDepartmentService = { create, getAll, getById, update, deleteById };
