'use client';
import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { paymentMethods } from '@/lib/constants/payment-method-card';

import Image from 'next/image';
import React, { useContext } from 'react';
import { useTranslations } from 'use-intl';

export default function PaymentCard() {
  // Translation
  const t = useTranslations('checkout');

  // Context
  const { paymentMethod, setPaymentMethod } = useContext(CheckoutContext)!;
  console.log(paymentMethod);
  return (
    <div className="flex flex-col items-center justify-center gap-3 md:flex md:flex-row md:items-center md:justify-between">
      {paymentMethods.map((card) => {
        return (
          <div
            key={card.id}
            onClick={()=>{setPaymentMethod(card.type)}}
            className="flex w-full flex-col items-center justify-center rounded-md border-[.0625rem] border-zinc-200 p-4 text-center md:h-[18.6875rem] md:w-[23.3125rem]"
          >
            <Image src={card.img} alt={card.alt} width={195} height={195} />
            <h1 className="text-2xl font-semibold">{t(card.title)}</h1>
            <p className="font-mulish text-sm font-semibold leading-[150%] text-zinc-500">
              {t(card.text)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
