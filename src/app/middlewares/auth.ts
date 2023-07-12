import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelper } from '../../helpers/jwtHelper';
import { ApiError } from './globalErrorHandler';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get token from header
      const token = req.headers.authorization;
      // check if token exist
      if (!token) {
        throw new ApiError(401, 'Unauthorized');
      }
      // verify token
      let decoded = null;
      decoded = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
      req.user = decoded;
      // role guard
      if (roles.length && !roles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden');
      }
      // call next middleware
      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
