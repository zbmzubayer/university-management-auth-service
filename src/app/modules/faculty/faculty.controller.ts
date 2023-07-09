import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../types/pagination';
import { facultyFilterFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { facultyService } from './faculty.service';

const getAll = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const searchTerm = pick(req.query, facultyFilterFields);
  const result = await facultyService.getAll(searchTerm, paginationOptions);
  sendResponse<IFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyService.getById(id);
  sendResponse<IFaculty | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await facultyService.update(id, data);
  sendResponse<IFaculty | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyService.deleteById(id);
  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});
export const facultyController = { getAll, getById, update, deleteById };
