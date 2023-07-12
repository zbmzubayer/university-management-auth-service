import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IToken } from './auth.interface';
import { authService } from './auth.service';

const login = catchAsync(async (req, res) => {
  //await createUserZodSchema.parseAsync(data);
  //logError.error(validation);
  const payload = req.body;
  const result = await authService.login(payload);
  // set refresh token in cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', result.refreshToken, cookieOptions);
  sendResponse<IToken>(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: { accessToken: result.accessToken },
  });
});
// get new access token using refresh token
const getAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.getAccessToken(refreshToken);
  // set refresh token in cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IToken>(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const authController = { login, getAccessToken };
