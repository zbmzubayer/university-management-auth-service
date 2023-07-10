import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { managementDepartmentFilterFields } from './management-department.constant';
import { IManagementDepartment } from './management-department.interface';
import { managementDepartmentService } from './management-department.service';

const create = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await managementDepartmentService.create(data);
  sendResponse<IManagementDepartment>(res, {
    statusCode: 201,
    success: true,
    message: 'Management department created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, managementDepartmentFilterFields);
  const result = await managementDepartmentService.getAll(searchTerm, paginationOptions);
  sendResponse<IManagementDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await managementDepartmentService.getById(id);
  sendResponse<IManagementDepartment | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await managementDepartmentService.update(id, data);
  sendResponse<IManagementDepartment | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await managementDepartmentService.deleteById(id);
  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  });
});

export const managementDepartmentController = { create, getAll, getById, update, deleteById };
