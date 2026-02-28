'use client';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { useCart } from '../../cart/_hooks/use-cart';
import SummarySkeleton from '@/components/skeletons/checkout/summary-skeleton';
import ListError from '@/components/error/list-error';
import { CURRENCY } from '@/lib/constants/global.constant';

export default function CartPrice() {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const locale = useLocale();
  const format = useFormatter();
  const { cart, isLoading, error } = useCart();

  // Variables
  const arabic = locale === 'ar';

  const totalPrice = cart?.cart?.totalPrice ?? 0;

  const cartPrice = format.number(totalPrice, 'decimals');
  const currencyLabel = arabic ? 'ج.م' : CURRENCY;
  const price = `${cartPrice} ${currencyLabel}`;
  return (
    <>
      {isLoading ? (
        <SummarySkeleton />
      ) : (
        <ListError errors={error}>
          <div className="flex w-full items-center justify-between px-4 pb-4">
            <h4 className="text-2xl font-bold text-zinc-800 first-letter:capitalize">
              {t('checkout-summary.total-salary')}
            </h4>
            <p className="text-2xl font-bold text-zinc-800 first-letter:capitalize">
              {t('checkout-summary.total-price', {
                price,
              })}
            </p>
          </div>
        </ListError>
      )}
    </>
  );
}
