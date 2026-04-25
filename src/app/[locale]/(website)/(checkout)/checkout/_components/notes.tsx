'use client';
import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import React, { useContext } from 'react';

export default function Notes() {
  // Context
  const { setNotes, notes } = useContext(CheckoutContext)!;

  // Translation
  const t = useTranslations('checkout');

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
      <h3 className="text-base font-semibold text-maroon-700 dark:text-softpink-200">
        {t('notes.title')}
      </h3>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={t('notes.placeholder')}
        className="min-h-28 w-full resize-none"
      />
    </div>
  );
}
