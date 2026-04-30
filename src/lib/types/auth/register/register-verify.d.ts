declare type ErrorVerifiyRegisterResponss = {
  status: false;
  message: string;
  code: number;
  errors: {
    path: string;
    message: string;
  }[];
};

//declare for Success verifyPassword
declare type SuccessVerifiyRegisterResponse = {
  status: true;
  message: string;
  code: number;
};

declare type ApiVerifiyRegisterResponse =
  | ErrorVerifiyRegisterResponss
  | SuccessVerifiyRegisterResponse;
