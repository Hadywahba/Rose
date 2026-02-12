import { Button } from '@/components/ui/button';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutMethodProps } from '@/lib/types/auth/forget-password/verify'
import React from 'react'

export default function PaymentMethods({ setStep }: CheckoutMethodProps) {
 return (
    <div>
      <div className="mb-4 flex justify-end">
        {/* Back Button */}
        <Button
          onClick={() => {
            setStep(CHECKOUT_STEPS.address);
          }}
          variant="primary"
          className="w-[9.5rem] rounded-lg py-6"
        >
          back
        </Button>
      </div>
    </div>
  );
}
