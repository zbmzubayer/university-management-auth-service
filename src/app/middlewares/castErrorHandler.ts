import mongoose from 'mongoose';
import { GenericErrorMessages, GenericErrorResponse } from '../../types/errorResponseMessage';

const castErrorHandler = (err: mongoose.Error.CastError): GenericErrorResponse => {
  const errors: GenericErrorMessages[] = [
    {
      path: err?.path,
      message: 'Invalid Id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default castErrorHandler;
