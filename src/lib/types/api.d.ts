declare type ErrorResponse = {
    error: string;
};
declare type SuccessResponse<T> = {
    message: "success";
} & T;
declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

