import { PaginationOptions } from '../types/pagination';

const calculatePagination = (paginationOptions: PaginationOptions) => {
  const page = Number(paginationOptions.page) || 1;
  const limit = Number(paginationOptions.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = paginationOptions.sortBy || 'createdAt';
  const order = paginationOptions.order || 'desc';
  return { page, limit, skip, sortBy, order };
};

export const paginationHelper = { calculatePagination };
