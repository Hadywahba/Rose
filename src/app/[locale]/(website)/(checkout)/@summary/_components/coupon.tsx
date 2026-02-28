import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TicketPercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Coupon() {
  // Translation
  const t = useTranslations('checkout');

  return (
    <div className="w-full">
      {/* Coupon Form */}
      <form className="flex w-full items-center gap-3">
        {' '}
        <div className="flex-1">
          <Input
            placeholder={t('checkout-summary.coupon-placeholder')}
            className="my-4 h-12 w-full bg-white placeholder:text-zinc-400 dark:focus:border-softpink-200 dark:text-white dark:placeholder:text-zinc-50"
          />
        </div>
        <Button
          variant="primary"
          className="h-12 w-1/2 whitespace-nowrap rounded-lg px-4 lg:w-auto"
        >
          <TicketPercent className="size-6" />
          {t('checkout-summary.coupon')}
        </Button>
      </form>

      {/* Coupon Applied */}
      <div className="mb-3 flex h-[15.125rem] w-full items-center justify-center rounded-lg border-[.0625rem] border-zinc-300">
        <p className="text-base font-normal text-zinc-400 first-letter:capitalize dark:text-zinc-50">
          {t('checkout-summary.coupon-applied')}
        </p>
      </div>
    </div>
  );
}
