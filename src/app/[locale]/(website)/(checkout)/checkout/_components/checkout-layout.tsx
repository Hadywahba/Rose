'use client';

import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutStep } from '@/lib/types/auth';
import { useState } from 'react';
import CheckOutContent from './checkout-content';
import PaymentMethods from './payment-methods';

export default function CheckoutLayout() {
  const [step, setStep] = useState<CheckoutStep>(CHECKOUT_STEPS.address);

  const steps = {
    [CHECKOUT_STEPS.address]: {
      checkout: <CheckOutContent setStep={setStep} />,
    },
    [CHECKOUT_STEPS.payment]: {
      checkout: <PaymentMethods setStep={setStep} />,
    },
  };

  return <>{steps[step].checkout}</>;
}
