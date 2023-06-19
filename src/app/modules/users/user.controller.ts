import { RequestHandler } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    //await createUserZodSchema.parseAsync(data);
    //logErrror.error(validation);
    const result = await userService.createUser(data);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
