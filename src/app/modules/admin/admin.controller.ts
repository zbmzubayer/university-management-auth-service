import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { adminFilterFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { adminService } from './admin.service';

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, adminFilterFields);
  const result = await adminService.getAll(searchTerm, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getById(id);
  sendResponse<IAdmin | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await adminService.update(id, data);
  sendResponse<IAdmin | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteById(id);
  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});
export const adminController = { getAll, getById, update, deleteById };
