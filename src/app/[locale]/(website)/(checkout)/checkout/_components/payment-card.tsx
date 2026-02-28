'use client';
import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { paymentMethods } from '@/lib/constants/payment-method-card';
import { cn } from '@/lib/utility/tailwind-merge';

import Image from 'next/image';
import React, { useContext } from 'react';
import { useTranslations } from 'use-intl';

export default function PaymentCard() {
  // Translation
  const t = useTranslations('checkout');

  // Context
  const { paymentMethod, setPaymentMethod } = useContext(CheckoutContext)!;

  return (
    <div className="flex flex-col items-center justify-center gap-3 md:flex md:flex-row md:items-center md:justify-between">
      {paymentMethods.map((card) => {
        const isActive = paymentMethod === card.type;
        return (
          <div
            key={card.id}
            onClick={() => {
              setPaymentMethod(card.type);
            }}
            className={cn(
              'flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-[.0625rem] border-zinc-200 p-4 text-center md:h-[18.6875rem] md:w-[23.3125rem]',
              isActive
                ? 'bg-zinc-200 dark:bg-zinc-300'
                : 'group hover:bg-maroon-600 dark:bg-zinc-50 dark:hover:bg-softpink-300',
            )}
          >
            <Image src={card.img} alt={card.alt} width={195} height={195} />
            <h1
              className={cn(
                'text-2xl font-semibold dark:text-zinc-800',
                'group-hover:dark:text-zinc-800',
                isActive
                  ? 'text-maroon-600 dark:text-maroon-600'
                  : 'group-hover:text-zinc-50',
              )}
            >
              {t(card.title)}
            </h1>
            <p
              className={cn(
                'font-mulish text-sm font-semibold leading-[150%] text-zinc-500',
                isActive
                  ? 'dark:text-black'
                  : 'group-hover:text-black group-hover:dark:text-zinc-50',
              )}
            >
              {t(card.text)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
