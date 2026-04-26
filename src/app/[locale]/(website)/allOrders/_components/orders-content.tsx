import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import OrderSkeleton from '@/components/skeletons/order/order-skeleton';
import { SearchParams } from '@/lib/types/global';
import { OrdersList } from './order-list';

type OrderContentProps = {
  searchParams: SearchParams;
};
export default async function OrderContent({
  searchParams,
}: OrderContentProps) {
  const t = await getTranslations('orders');

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-50 md:text-4xl">
        {t('title')}
      </h1>

      <Suspense fallback={<OrderSkeleton />}>
        <OrdersList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
