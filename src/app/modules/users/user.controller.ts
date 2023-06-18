import { RequestHandler } from 'express';
import { userService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    //await createUserZodSchema.parseAsync(data);
    //logErrror.error(validation);
    const result = await userService.createUser(data);
    res.status(201).json({
      success: true,
      message: 'User created',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
