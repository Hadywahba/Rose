export type VerifyResetFields = {
  resetCode: string;
};

export interface ForgotPasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>;
}

