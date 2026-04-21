declare type ErrorResponse = {
  message: string;
  status: false;
  code: number;
};

declare type SuccessResponse<T> = {
  status: true;
  code: number;
  payload: T;
};

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

declare type MetaData = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
};

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number;
  };
} & T;
