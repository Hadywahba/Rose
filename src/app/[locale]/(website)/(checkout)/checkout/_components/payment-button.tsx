'use client';

import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import SubmitError from '@/components/error/submit-error';
import { useAddOrder } from '../_hooks/use-new-order';

export default function PaymentButton() {
  // Translation
  const t = useTranslations('checkout');

  const [localError, setLocalError] = useState<Error | null>(null);

  // Context
  const { paymentMethod, addressId, notes } = useContext(CheckoutContext)!;

  // Hook
  const locale = useLocale();

  const { AddOrder, error, isPending } = useAddOrder();

  // Variable
  const arabic = locale === 'ar';
  const isDisabled = !paymentMethod || !addressId || !notes;

  // Function
  const handlePayment = () => {
    setLocalError(null); // reset
    try {
      if (!addressId || !paymentMethod || !notes) {
        throw new Error(t('payment-methods.select-required'));
      }
      const payload = {
        paymentMethod,
        addressId,
        notes: notes,
      };
      AddOrder(payload);
    } catch (err) {
      setLocalError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end pt-4">
        <Button
          onClick={handlePayment}
          variant="primary"
          className="w-full rounded-lg py-5 capitalize disabled:bg-maroon-600 dark:disabled:bg-softpink-200 md:w-[9.5rem]"
          disabled={isDisabled}
        >
          {arabic && !isPending && <MoveLeft className="h-5 w-5" />}
          {isPending
            ? t('payment-methods.payment-loading')
            : t('checkout-summary.checkout-button')}
          {!arabic && !isPending && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
      {/* Error */}
      {(error || localError) && <SubmitError errors={error || localError} />}
    </div>
  );
}
