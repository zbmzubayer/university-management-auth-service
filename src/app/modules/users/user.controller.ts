import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  //await createUserZodSchema.parseAsync(data);
  //logErrror.error(validation);
  const result = await userService.createUser(data);
  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
