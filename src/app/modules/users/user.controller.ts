import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  //await createUserZodSchema.parseAsync(data);
  //logError.error(validation);
  const { user, student } = req.body;
  const result = await userService.createStudent(user, student);
  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
};
