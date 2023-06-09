import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  //await createUserZodSchema.parseAsync(data);
  //logError.error(validation);
  const { user, student } = req.body;
  console.log(req.cookies);
  const result = await userService.createStudent(user, student);
  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { user, faculty } = req.body;
  const result = await userService.createFaculty(user, faculty);
  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { user, admin } = req.body;
  const result = await userService.createAdmin(user, admin);
  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: 'Admin Created Successfully',
    data: result,
  });
});

export const userController = { createStudent, createFaculty, createAdmin };
