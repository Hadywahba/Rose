'use client';

import React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';
import { CHECKOUT_STEPS } from '@/lib/constants/checkout.constant';
import { CheckoutStep } from '@/lib/types/auth';

interface CheckoutProgressProps {
  step: CheckoutStep;
}

export default function CheckoutProgress({ step }: CheckoutProgressProps) {
  // Variable
  const steps = [CHECKOUT_STEPS.address, CHECKOUT_STEPS.payment];

  const currentStepIndex = steps.indexOf(step) + 1;

  return (
    <div className="relative mb-6 mt-2 flex w-full flex-col gap-2">
      {/* Progress Line */}
      <div className="relative h-2 w-full rounded-full bg-zinc-200">
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-maroon-600 transition-all duration-500 dark:bg-softpink-300"
          style={{ width: currentStepIndex === 1 ? '25%' : '100%' }}
        />
      </div>

      {/* Steps Circles */}
      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-around">
        {steps.map((s, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={s}
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border-2 font-mulish font-semibold transition-colors duration-500',
                stepNumber <= currentStepIndex
                  ? 'border-maroon-600 bg-maroon-600 text-white dark:border-softpink-300 dark:bg-softpink-300 dark:text-zinc-800'
                  : 'border-zinc-200 bg-zinc-200 text-gray-500',
              )}
            >
              {stepNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
