import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { academicFacultyFilterFields } from './academic-faculty.constant';
import { IAcademicFaculty } from './academic-faculty.interface';
import { academicFacultyService } from './academic-faculty.service';

const create = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicFacultyService.create(data);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 201,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, academicFacultyFilterFields);
  const result = await academicFacultyService.getAll(searchTerm, paginationOptions);
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultyService.getById(id);
  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await academicFacultyService.update(id, data);
  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultyService.deleteById(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const academicFacultyController = { create, getAll, getById, update, deleteById };
