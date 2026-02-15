'use client';

import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { useState } from 'react';
import CheckOutContent from './checkout-content';
import PaymentMethods from './payment-methods';
import { CheckoutStep } from '@/lib/types/checkout/checkout';

export default function CheckoutLayout() {
  // Stste
  const [step, setStep] = useState<CheckoutStep>(CHECKOUT_STEPS.address);

  // Variable
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
