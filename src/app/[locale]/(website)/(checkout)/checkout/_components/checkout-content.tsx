
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import CheckoutAddress from './checkout-address';
import AddressButton from './address-button';

export default function CheckOutContent() {
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
      <div className="flex justify-end">
        <Button variant="primary" className="w-[9.5rem] rounded-lg py-6">
          {arabic && <MoveLeft className="h-5 w-5" />}
          {t('next-step')}
          {!arabic && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
    </main>
  );
}
