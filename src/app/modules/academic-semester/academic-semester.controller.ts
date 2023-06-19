import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const academicSemesterController = { create };
