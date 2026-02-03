declare type ErrorResponse = {
  error: string;
};

declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

