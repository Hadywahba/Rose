declare type ErrorChangePasswordResponss = {
  message: string;
  code: number;
  status: false;
  errors: {
    path: string;
    message: string;
  }[];
};

declare type SuccessChangePasswordResponse = {
  code: number;
  status: true;
  message: string;
};

declare type ApiChangePasswordResponse =
  | ErrorChangePasswordResponss
  | SuccessChangePasswordResponse;
