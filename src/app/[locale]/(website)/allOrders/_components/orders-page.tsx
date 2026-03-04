'use client';

import React from 'react';
import { PackageOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useOrders } from '@/lib/hooks/orders/use-orders';
import Spinner from '@/components/loader/Spinner';
import OrderCard from './order-card';

export default function OrdersPage() {
  // Translation
  const t = useTranslations('orders');

  // Queries
  const { data, isLoading, isFetching } = useOrders();

  // Variables
  const orders = data?.orders ?? [];

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-50 md:text-4xl">
        {t('title')}
      </h1>

      {/* Loading State */}
      {(isLoading || isFetching) && (
        <div className="mt-10 flex justify-center py-20">
          <Spinner />
        </div>
      )}

      {/* Orders List */}
      {!isLoading && !isFetching && (
        <div className="mt-6 flex flex-col gap-6">
          {/* Empty State */}
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-900">
              <div className="mx-auto flex max-w-md flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-maroon-700 dark:bg-zinc-800 dark:text-softpink-400">
                  <PackageOpen className="h-7 w-7" />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {t('empty.title')}
                </h2>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {t('empty.description')}
                </p>
              </div>
            </div>
          ) : (
            // Order Cards
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          )}
        </div>
      )}
    </section>
  );
}
