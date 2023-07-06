import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { academicDepartmentSearchFields } from './academic-department.constant';
import { IAcademicDepartment } from './academic-department.interface';
import { AcademicDepartment } from './academic-department.model';

const create = async (payload: IAcademicDepartment): Promise<IAcademicDepartment> => {
  const createdAcademicDepartment = AcademicDepartment.create(payload);
  return createdAcademicDepartment;
};

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = academicDepartmentSearchFields;
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
  const total = await AcademicDepartment.countDocuments();
  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getById = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const update = async (id: string, payload: IAcademicDepartment): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true }).populate(
    'academicFaculty'
  );
  return result;
};

const deleteById = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate('academicFaculty');
  return result;
};

export const academicDepartmentService = { create, getAll, getById, update, deleteById };
