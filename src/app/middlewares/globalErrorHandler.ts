import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import { GenericErrorMessages } from '../../types/errorResponseMessage';
import castErrorHandler from './castErrorHandler';
import validationErrorHandler from './validationErrorHandler';
import zodErrorHandler from './zodErrorHandler';

export class ApiError extends Error {
  constructor(public statusCode: number, message: string | undefined, public stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: GenericErrorMessages[] = [];

  if (err?.name === 'ValidationError') {
    const commonErrorMessages = validationErrorHandler(err);
    statusCode = commonErrorMessages.statusCode;
    message = commonErrorMessages.message;
    errorMessages = commonErrorMessages.errorMessages;
  } else if (err instanceof ZodError) {
    const commonErrorMessage = zodErrorHandler(err);
    statusCode = commonErrorMessage.statusCode;
    message = commonErrorMessage.message;
    errorMessages = commonErrorMessage.errorMessages;
  } else if (err?.name === 'CastError') {
    const commonErrorMessage = castErrorHandler(err);
    statusCode = commonErrorMessage.statusCode;
    message = commonErrorMessage.message;
    errorMessages = commonErrorMessage.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env != 'production' ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
