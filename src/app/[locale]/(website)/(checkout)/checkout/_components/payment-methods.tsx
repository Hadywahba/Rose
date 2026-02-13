'use client';
import { Button } from '@/components/ui/button';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutMethodProps } from '@/lib/types/auth/forget-password/verify';
import { cn } from '@/lib/utility/tailwind-merge';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useLocale, useTranslations } from 'use-intl';
import PaymentCard from './payment-card';
import PaymentButton from './payment-button';
import SharedProgress from '@/components/shared/shared-progress';


export default function PaymentMethods({ setStep }: CheckoutMethodProps) {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';

  const steps = [CHECKOUT_STEPS.address, CHECKOUT_STEPS.payment];

  return (
    <main className="flex flex-col">
      {/* Progress Section */}
      <SharedProgress
        step={CHECKOUT_STEPS.payment}
        steps={steps}
        secondValue={'100%'}
      />

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
      <section className="flex w-full flex-col border-b-[.0625rem] border-zinc-100 p-3 pb-4 dark:border-zinc-300">
        <PaymentCard />
      </section>

      {/* Checkout Button */}
      <PaymentButton />
    </main>
  );
}
