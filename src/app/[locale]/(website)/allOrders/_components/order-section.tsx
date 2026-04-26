'use client';

import React from 'react';
import OrderItem from './order-item';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

  // variables
  const VISIBLE_ITEMS = 2;

  const canToggle = order.orderItems.length > VISIBLE_ITEMS;

  const maxItems = VISIBLE_ITEMS + 2;

  const displayed = showAll
    ? order.orderItems
    : order.orderItems.slice(0, maxItems);

  const isCollapsed = !showAll && canToggle;

  return (
    <div className="mt-4">
      <p className="font-semibold text-zinc-900 dark:text-zinc-50">
        {t('card.orderItems')}:
      </p>

      <div className="mt-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/40">
        <div
          className={cn(
            'grid grid-cols-1 gap-4 md:grid-cols-2',
            isCollapsed && 'max-h-[320px] overflow-hidden',
          )}
        >
          {displayed.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>

        {isCollapsed && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-3 flex items-center gap-1 text-sm font-semibold text-maroon-700"
          >
            Show all <ChevronDown className="size-4" />
          </button>
        )}

        {showAll && canToggle && (
          <button
            onClick={() => setShowAll(false)}
            className="mt-3 flex items-center gap-1 text-sm font-semibold text-maroon-700"
          >
            Show less <ChevronUp className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
