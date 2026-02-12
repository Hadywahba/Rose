export type VerifyResetFields = {
  resetCode: string;
};

export interface ForgotPasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>;
}

export interface CheckoutMethodProps {
  setStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
}