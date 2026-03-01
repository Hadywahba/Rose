'use client';

import React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';
import { AddressStep, CheckoutStep } from '@/lib/types/auth';
import { useLocale } from 'next-intl';

interface CheckoutProgressProps {
  step: CheckoutStep | AddressStep;
  steps: string[];
  firstValue?: string;
  secondValue?: string;
}

export default function SharedProgress({
  step,
  steps,
  firstValue,
  secondValue,
}: CheckoutProgressProps) {
  const locale = useLocale();
  const rtl = locale === 'ar';
  const currentStepIndex = steps.indexOf(step) + 1;

  const formatNumber = (num: number) =>
    rtl
      ? new Intl.NumberFormat('ar-EG', { numberingSystem: 'arab' }).format(num)
      : num;

  return (
    <div className="relative mb-6 mt-2 flex w-full flex-col gap-2">
      {/* Progress Line */}
      <div className="relative h-2 w-full rounded-full bg-zinc-200">
        <div
          className={cn(
            'absolute top-0 h-2 rounded-full bg-maroon-600 transition-all duration-500 dark:bg-softpink-300',
            rtl ? 'right-0 origin-right' : 'left-0 origin-left',
          )}
          style={{ width: currentStepIndex === 1 ? firstValue : secondValue }}
        />
      </div>

      {/* Steps Circles */}
      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-row justify-around">
        {steps.map((s, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={s}
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border-2 font-semibold transition-colors duration-500',
                stepNumber <= currentStepIndex
                  ? 'border-maroon-600 bg-maroon-600 text-white dark:border-softpink-300 dark:bg-softpink-300 dark:text-zinc-800'
                  : 'border-zinc-200 bg-zinc-200 text-gray-500',
              )}
            >
              {formatNumber(stepNumber)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
