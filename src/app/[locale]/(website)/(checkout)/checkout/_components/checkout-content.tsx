'use client';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import CheckoutAddress from './checkout-address';
import AddressButton from './address-button';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import SharedProgress from '@/components/shared/shared-progress';
import { CheckoutMethodProps } from '@/lib/types/checkout/checkout';
import { Address } from '@/lib/types/address/address';

interface Props extends CheckoutMethodProps {
  myAddresses: React.ReactNode;
  address: Address[];
  addressError: Error | null;
}
export default function CheckOutContent({
  setStep,
  myAddresses,
  address,
  addressError,
}: Props) {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const locale = useLocale();

  // Variable
const steps = [CHECKOUT_STEPS.address, CHECKOUT_STEPS.payment ,CHECKOUT_STEPS.notes ];

  // Variable
  const arabic = locale === 'ar';

  return (
    <main className="flex flex-col gap-6">
      {/* Progress Section */}
      <SharedProgress
        step={CHECKOUT_STEPS.address}
        steps={steps}
        firstValue={'33.3%'}
      />
      {/* Title */}
      <h1 className="text-3xl font-semibold capitalize">
        {t('shipping-address')}
      </h1>

      {/* Adresses */}
      <CheckoutAddress displayAddress={address} addressError={addressError} />

      {/* Added New Adress */}
      <AddressButton />
      {myAddresses}

      {/* Next Step */}
      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => {
            setStep(CHECKOUT_STEPS.payment);
          }}
          variant="primary"
          className="w-[9.5rem] rounded-lg py-5 capitalize"
        >
          {arabic && <MoveLeft className="h-5 w-5" />}
          {t('next-step')}
          {!arabic && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
    </main>
  );
}
