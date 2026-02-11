import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import Coupon from './_components/coupon';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import CartPrice from './_components/cart-price';

export default function Default() {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';

  return (
    <div>
      <h2 className="text-3xl font-semibold">
        {t('checkout-summary.summary')}
      </h2>
      {/* Salary &  Coupon */}
      <section className="mt-6 flex flex-col items-center justify-center rounded-lg bg-zinc-50 px-4 dark:bg-zinc-400">
        {/* Coupon Part */}
        <Coupon />
        {/* Price */}
        <CartPrice />
      </section>

      {/* Button */}
      <div className="w-full pb-4 pt-6">
        <Button variant={'primary'} className="w-full rounded-lg py-6">
          {arabic ? <MoveLeft /> : null}
          {t('checkout-summary.checkout-button')}
          {!arabic ? <MoveRight /> : null}
        </Button>
      </div>
    </div>
  );
}
