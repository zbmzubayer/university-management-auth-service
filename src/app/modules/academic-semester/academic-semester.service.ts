import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { academicSemesterSearchFields } from './academic-semester.constants';
import { IAcademicSemester } from './academic-semester.interface';
import { AcademicSemester } from './academic-semester.model';
import { getAcademicSemesterCode } from './academic-semester.util';

const create = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
  payload.code = getAcademicSemesterCode(payload.title);
  const createdAcademicSemester = AcademicSemester.create(payload);
  return createdAcademicSemester;
};

const getAll = async (
  search: { searchTerm?: string },
  paginationOptions: PaginationOptions
): Promise<PaginationResult<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, order } = paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterFields } = search;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && order) {
    sortCondition[sortBy] = order;
  }
  const searchFields = academicSemesterSearchFields;
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
  // const searchCondition = [
  //   {
  //     $or: [
  //       { title: { $regex: searchTerm, $options: 'i' } },
  //       { code: { $regex: searchTerm, $options: 'i' } },
  //       { year: { $regex: searchTerm, $options: 'i' } },
  //     ],
  //   },
  // ];
  const total = await AcademicSemester.countDocuments();
  const result = await AcademicSemester.find(whereCondition).sort(sortCondition).skip(skip).limit(limit);
  return {
    meta: { page, limit, total },
    data: result,
  };
};

export const academicSemesterService = { create, getAll };
