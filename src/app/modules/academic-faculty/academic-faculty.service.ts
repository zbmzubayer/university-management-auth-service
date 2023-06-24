import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { academicFacultySearchFields } from './academic-faculty.constant';
import { IAcademicFaculty } from './academic-faculty.interface';
import { AcademicFaculty } from './academic-faculty.model';

const create = async (payload: IAcademicFaculty): Promise<IAcademicFaculty> => {
  const createdAcademicSemester = AcademicFaculty.create(payload);
  return createdAcademicSemester;
};

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = academicFacultySearchFields;
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
  const total = await AcademicFaculty.countDocuments();
  const result = await AcademicFaculty.find(whereCondition).sort(sortCondition).skip(skip).limit(limit);
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getById = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const update = async (id: string, payload: IAcademicFaculty): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

const deleteById = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const academicFacultyService = { create, getAll, getById, update, deleteById };
