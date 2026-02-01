import { FORGOT_PASSWORD_STEPS } from './../constants/auth.constant';

// forgot password step type
export type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];
