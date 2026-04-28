//declare for Error verifyPassword
declare type ErrorDeleteResponss = {
  message: string;
  code: number;
  status: false;
};

//declare for Success verifyPassword
declare type SuccessDeleteResponse = {
  status: true;
  code: number;
  message: string;
};

declare type ApiDeleteResponse = ErrorDeleteResponss | SuccessDeleteResponse;
