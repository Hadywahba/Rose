//declare for Error verifyPassword
declare type ErrorForgotPassResponss = {
  message: string;
  code: number;
  status: false;
  errors: {
    path: string;
    message: string;
  }[];
};

//declare for Success verifyPassword
declare type SuccessForgotPassResponse = {
  status: true;
  message: string;
  code: number;
};

declare type ApiForgotPassResponse =
  | ErrorForgotPassResponss
  | SuccessForgotPassResponse;
