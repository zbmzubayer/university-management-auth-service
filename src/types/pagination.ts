import { SortOrder } from 'mongoose';

export type PaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: SortOrder;
};

export const paginationFields = ['page', 'limit', 'sortBy', 'order'];

export type PaginationResult<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
