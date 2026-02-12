import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import CheckoutAddress from './checkout-address';
import AddressButton from './address-button';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutMethodProps } from '@/lib/types/auth/forget-password/verify';

export default function CheckOutContent({ setStep }: CheckoutMethodProps) {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';

  return (
    <main className="flex flex-col gap-6">
      {/* Progress Section */}

      {/* Title */}
      <h1 className="text-3xl font-semibold capitalize">
        {t('shipping-address')}
      </h1>

      {/* Adresses */}
      <CheckoutAddress />

      {/* Added New Adress */}
      <AddressButton />

      {/* Next Step */}
      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => {
            setStep(CHECKOUT_STEPS.payment);
          }}
          variant="primary"
          className="w-[9.5rem] rounded-lg py-6"
        >
          {arabic && <MoveLeft className="h-5 w-5" />}
          {t('next-step')}
          {!arabic && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
    </main>
  );
}
