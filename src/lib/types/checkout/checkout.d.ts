import { CHECKOUT_STEPS } from "@/lib/constants/checkout.constant";

export interface CheckoutMethodProps {
  setStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
}

// Checkout step type
export type CheckoutStep = (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];