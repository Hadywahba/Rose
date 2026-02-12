"use client"
import { Button } from '@/components/ui/button';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutMethodProps } from '@/lib/types/auth/forget-password/verify';
import { cn } from '@/lib/utility/tailwind-merge';
import { ArrowLeft, MoveLeft, MoveRight } from 'lucide-react';
import React, { useContext } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import PaymentCard from './payment-card';
import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';

export default function PaymentMethods({ setStep }: CheckoutMethodProps) {
  // Translation
  const t = useTranslations('checkout');

 // Context
  const { paymentMethod , address } = useContext(CheckoutContext)!;

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';
  return (
    <main className="flex flex-col">
      {/* Progress Section */}

      {/* Button & Title */}
      <div
        className={cn(
          'mb-4 flex items-center gap-4',
          arabic ? 'justify-end' : 'justify-start',
        )}
      >
        {/* Back Button */}
        <Button
          onClick={() => {
            setStep(CHECKOUT_STEPS.address);
          }}
          variant="primary"
          className="w-24 rounded-lg bg-zinc-100 py-5 capitalize text-zinc-800 hover:bg-zinc-300"
        >
          {arabic ? (
            <>
              {t('back-step')}
              <ArrowLeft className="h-5 w-5 rotate-180" />{' '}
            </>
          ) : (
            <>
              <ArrowLeft className="h-5 w-5" />
              {t('back-step')}
            </>
          )}
        </Button>

        {/* Text */}
        <p className="text-3xl font-semibold capitalize">
          {t('payment-method')}{' '}
        </p>
      </div>

      {/* Payment Method */}
      <section className="flex w-full flex-col p-3 pb-4 border-b-[.0625rem] border-zinc-100 dark:border-zinc-300 ">
        <PaymentCard />
      </section>

      {/* Checkout Button */}
      <div className="mb-4 flex justify-end pt-4 ">
        <Button
          variant="primary"
          className=" w-full md:w-[9.5rem] rounded-lg py-5 capitalize disabled:bg-maroon-600 dark:disabled:bg-softpink-200"
          disabled={paymentMethod===null || address ===null }
        >
          {arabic && <MoveLeft className="h-5 w-5" />}
          {t('checkout-summary.checkout-button')}
          {!arabic && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
    </main>
  );
}
