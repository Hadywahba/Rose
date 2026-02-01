declare type ErrorResponss = {
  error?: string;
  message?: string;
};

declare type SuccessResponse = {
  message: string;
} & T;

declare type ApiResponse<T> = ErrorResponss | SuccessResponse<T>;
