import mongoose from 'mongoose';
import { GenericErrorMessages, GenericErrorResponse } from '../../types/errorResponseMessage';

const validationErrorHandler = (err: mongoose.Error.ValidationError): GenericErrorResponse => {
  const errors: GenericErrorMessages[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default validationErrorHandler;
