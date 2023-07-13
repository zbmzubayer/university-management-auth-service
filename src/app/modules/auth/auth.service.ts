import bcrypt from 'bcrypt';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { ApiError } from '../../middlewares/globalErrorHandler';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { IAuth, IChangePassword, IToken } from './auth.interface';

const login = async (payload: IAuth): Promise<IToken> => {
  const { id, password } = payload;
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  const isPasswordValid = await user.isPasswordValid(password, isUserExist as IUser);
  if (!isPasswordValid) throw new ApiError(401, 'Invalid credentials');
  const jwtPayload = { id: isUserExist.id as string, role: isUserExist.role as string };
  const accessToken = jwtHelper.createToken(jwtPayload, config.jwt.secret as Secret, config.jwt.expiresIn as string);
  const refreshToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string
  );
  return { accessToken, refreshToken };
};
// get new access token using refresh token
const getAccessToken = async (refreshToken: string): Promise<IToken> => {
  let decoded = null;
  try {
    decoded = jwtHelper.verifyToken(refreshToken, config.jwt.refreshSecret as Secret);
  } catch (err) {
    throw new ApiError(403, 'Invalid refresh token');
  }
  // check if user exist
  const user = new User();
  const isUserExist = await user.isUserExist(decoded.id);
  if (!isUserExist) throw new ApiError(404, 'User does not exist');
  const accessToken = jwtHelper.createToken(
    { id: decoded.id, role: decoded.role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );
  return { accessToken: accessToken };
};

const changePassword = async (payload: JwtPayload | null, data: IChangePassword): Promise<boolean> => {
  const user = new User();
  const isUserExist = await user.isUserExist(payload?.id);
  // check if user exist
  if (!isUserExist) throw new ApiError(404, 'User does not exist');
  const isPasswordValid = await user.isPasswordValid(data.oldPassword, isUserExist as IUser);
  // check if old password is correct
  if (!isPasswordValid) throw new ApiError(400, 'Incorrect password');
  // check if old password and new password are same
  if (data.oldPassword === data.newPassword) throw new ApiError(400, 'New password cannot be same as old password');
  // hash password
  const newHashedPassword = await bcrypt.hash(data.newPassword, Number(config.bcryptSaltRounds));
  // update data
  const query = { id: payload?.id };
  const updatedData = {
    password: newHashedPassword,
    passwordChanged: true,
    passwordChangedAt: new Date(),
  };
  const updatedUser = await User.findOneAndUpdate(query, updatedData);
  if (updatedUser) return true;
  else return false;
};

export const authService = { login, getAccessToken, changePassword };
