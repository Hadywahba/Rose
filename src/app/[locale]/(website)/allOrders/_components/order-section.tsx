'use client';

import React from 'react';
import OrderItems from './order-item';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';
import { Order } from '@/lib/types/order/order';

interface OrderItemsSectionProps {
  showAll: boolean;
  setShowAll: (value: boolean) => void;
  order: Order;
}

export default function OrderItemsSection({
  order,
  showAll,
  setShowAll,
}: OrderItemsSectionProps) {
  // Translations
  const t = useTranslations('orders');

  // Variables
  const VISIBLE_ITEMS = 4;
  const canToggle = order.orderItems.length > VISIBLE_ITEMS;
  const displayed = showAll
    ? order.orderItems
    : order.orderItems.slice(0, VISIBLE_ITEMS);

  const isCollapsed = !showAll && canToggle;

  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center gap-2">
        <ShoppingBag className="h-4 w-4 text-maroon-600 dark:text-softpink-400" />
        <p className="text-sm font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
          {t('card.orderItems')}
          <span className="ml-2 rounded-full bg-maroon-100 px-2 py-0.5 text-xs font-bold text-maroon-700 dark:bg-maroon-900/40 dark:text-softpink-400">
            {order.orderItems.length}
          </span>
        </p>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-3 md:grid-cols-2',
          isCollapsed &&
            'max-h-[300px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]',
        )}
      >
        {displayed.map((item) => (
          <OrderItems key={item.id} item={item} />
        ))}
      </div>

      {isCollapsed && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-maroon-300 py-2 text-sm font-semibold text-maroon-600 transition-colors hover:bg-maroon-50 dark:border-maroon-700 dark:text-softpink-400 dark:hover:bg-maroon-900/20"
        >
          {t('card.showAll')} ({order.orderItems.length})
          <ChevronDown className="h-4 w-4" />
        </button>
      )}

      {showAll && canToggle && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {t('card.showLess')}
          <ChevronUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
