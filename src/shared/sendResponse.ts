import { Response } from 'express';

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, obj: ApiResponse<T>): void => {
  const responseData: ApiResponse<T> = {
    statusCode: obj.statusCode,
    success: obj.success,
    message: obj.message || null,
    meta: obj.meta,
    data: obj.data || null,
  };
  res.status(obj.statusCode).json(responseData);
};

export default sendResponse;
