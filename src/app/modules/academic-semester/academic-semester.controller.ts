import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { academicSemesterFilterFields } from './academic-semester.constants';
import { IAcademicSemester } from './academic-semester.interface';
import { academicSemesterService } from './academic-semester.service';

const create = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicSemesterService.create(data);
  sendResponse<IAcademicSemester>(res, {
    statusCode: 201,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, academicSemesterFilterFields);
  const result = await academicSemesterService.getAll(searchTerm, paginationOptions);
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicSemesterService.getById(id);
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await academicSemesterService.update(id, data);
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicSemesterService.deleteById(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester deleted successfully',
    data: result,
  });
});
export const academicSemesterController = { create, getAll, getById, update, deleteById };
