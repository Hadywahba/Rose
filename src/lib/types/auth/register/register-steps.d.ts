import { Register_STEPS } from "../constants/register.constant";

export type RegisterSteps =
  (typeof Register_STEPS)[keyof typeof Register_STEPS];

export interface RegisterProps {
  setStep: React.Dispatch<React.SetStateAction<RegisterSteps>>;
}