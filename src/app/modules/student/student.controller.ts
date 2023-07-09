import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { studentFilterFields } from './student.constant';
import { IStudent } from './student.interface';
import { studentService } from './student.service';

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, studentFilterFields);
  const result = await studentService.getAll(searchTerm, paginationOptions);
  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Student fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.getById(id);
  sendResponse<IStudent | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await studentService.update(id, data);
  sendResponse<IStudent | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.deleteById(id);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
export const studentController = { getAll, getById, update, deleteById };
