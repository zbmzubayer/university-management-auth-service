import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { academicDepartmentFilterFields } from './academic-department.constant';
import { IAcademicDepartment } from './academic-department.interface';
import { academicDepartmentService } from './academic-department.service';

const create = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicDepartmentService.create(data);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 201,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, academicDepartmentFilterFields);
  const result = await academicDepartmentService.getAll(searchTerm, paginationOptions);
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicDepartmentService.getById(id);
  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await academicDepartmentService.update(id, data);
  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicDepartmentService.deleteById(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department deleted successfully',
    data: result,
  });
});

export const academicDepartmentController = { create, getAll, getById, update, deleteById };
