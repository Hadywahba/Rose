import SharedProgress from '@/components/shared/shared-progress';
import { Button } from '@/components/ui/button';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutMethodProps } from '@/lib/types/checkout/checkout';
import { cn } from '@/lib/utility/tailwind-merge';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useLocale, useTranslations } from 'use-intl';
import Notes from './notes';
import PaymentButton from './payment-button';

export default function AddNotes({ setStep }: CheckoutMethodProps) {
  // Translation
  const t = useTranslations('');

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';

  const steps = [
    CHECKOUT_STEPS.address,
    CHECKOUT_STEPS.payment,
    CHECKOUT_STEPS.notes,
  ];
  return (
    <main className="flex flex-col">
      {/* Progress Section */}
      <SharedProgress
        step={CHECKOUT_STEPS.notes}
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
            setStep(CHECKOUT_STEPS.payment);
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
      </div>

      {/* Content */}
      <Notes />

        {/* Checkout Button */}
      <PaymentButton />
    </main>
  );
}
