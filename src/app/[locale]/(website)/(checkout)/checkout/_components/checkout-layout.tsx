'use client';

import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { useState } from 'react';
import CheckOutContent from './checkout-content';
import PaymentMethods from './payment-methods';
import { CheckoutStep } from '@/lib/types/checkout/checkout';
import { Address } from '@/lib/types/address/address';
import AddNotes from './add-notes';

type Props = {
  myAddresses: React.ReactNode;
  address: Address[];
  addressError: Error | null;
};

export default function CheckoutLayout({
  myAddresses,
  address,
  addressError,
}: Props) {
  const [step, setStep] = useState<CheckoutStep>(CHECKOUT_STEPS.address);

  const steps = {
    [CHECKOUT_STEPS.address]: {
      checkout: (
        <CheckOutContent
          myAddresses={myAddresses}
          setStep={setStep}
          address={address}
          addressError={addressError}
        />
      ),
    },
    [CHECKOUT_STEPS.payment]: {
      checkout: <PaymentMethods setStep={setStep} />,
    },

    [CHECKOUT_STEPS.notes]: {
      checkout: <AddNotes setStep={setStep} />,
    },
  };

  return <>{steps[step].checkout}</>;
}
