import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { IAcademicSemester } from './academic-semester.interface';
import { academicSemesterService } from './academic-semester.service';

const create = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicSemesterService.create(data);
  sendResponse<IAcademicSemester>(res, {
    statusCode: 201,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, ['searchTerm']);
  console.log(searchTerm, paginationOptions);
  const result = await academicSemesterService.getAll(searchTerm, paginationOptions);
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const academicSemesterController = { create, getAll };
