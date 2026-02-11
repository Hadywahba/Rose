'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Coupon from './_components/coupon';
import CartPrice from './_components/cart-price';
import CartCheckoutButton from './_components/cart-checkout-button';
import { usePathname } from '@/i18n/navigation';

export default function Default() {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const pathname = usePathname();

  // Variable
  const isCartPage = pathname.includes('/cart');

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
      {isCartPage && <CartCheckoutButton />}
    </div>
  );
}
