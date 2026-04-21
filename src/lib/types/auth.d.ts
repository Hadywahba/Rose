import { FORGOT_PASSWORD_STEPS } from './../constants/auth.constant';

// forgot password step type
export type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type RegisterFields = z.infer<typeof registerSchema>;
export interface User {
  id: string;
  firstName: string;
  username: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

// Checkout step type
export type CheckoutStep = (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];
export type AddressStep = (typeof ADDRESS_STEPS)[keyof typeof ADDRESS_STEPS];
