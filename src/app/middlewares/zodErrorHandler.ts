import { ZodError, ZodIssue } from 'zod';
import { GenericErrorMessages, GenericErrorResponse } from '../../types/errorResponseMessage';

const zodErrorHandler = (err: ZodError): GenericErrorResponse => {
  const errors: GenericErrorMessages[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[0],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorMessages: errors,
  };
};

export default zodErrorHandler;
