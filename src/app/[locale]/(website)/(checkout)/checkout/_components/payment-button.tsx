'use client';
import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useContext } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import { usePaymentVisa } from '../_hooks/use-payment-visa';
import SubmitError from '@/components/error/submit-error';
import { PaymentMethods } from '@/lib/enums/payment-method.enum';
import { usePaymentCash } from '../_hooks/use-payment-cash';

export default function PaymentButton() {
  // Translation
  const t = useTranslations('checkout');

  // Context
  const { paymentMethod, address } = useContext(CheckoutContext)!;

  // Hook
  const locale = useLocale();
  const { visaPayment, visaError, visaPending } = usePaymentVisa();
  const { cashPayment, cashError, cashPending } = usePaymentCash();

  // Variable
  const arabic = locale === 'ar';
  const isDisabled =
    !paymentMethod ||
    !address ||
    (paymentMethod === PaymentMethods.visa && visaPending) ||
    (paymentMethod === PaymentMethods.cash && cashPending);

  // Function
  const handlePayment = () => {
    if (!address || !paymentMethod) return;

    if (paymentMethod === PaymentMethods.visa) {
      visaPayment(address);
    }

    if (paymentMethod === PaymentMethods.cash) {
      cashPayment(address);
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
          {arabic && <MoveLeft className="h-5 w-5" />}
          {visaPending || cashPending
            ? t('payment-methods.payment-loading')
            : t('checkout-summary.checkout-button')}
          {!arabic && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
      {/* Error */}
      {(visaError || cashError) && (
        <div className="">
          <SubmitError errors={visaError || cashError} />
        </div>
      )}
    </div>
  );
}
