'use client';

import React from 'react';
import { useFormatter, useTranslations } from 'next-intl';

import OrderItem from './order-item';
import {
  ChevronDown,
  ChevronUp,
  Check,
  CheckCircle2,
  CreditCard,
  Banknote,
  TriangleAlert,
  Truck,
} from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import { Order } from '@/lib/types/order/order';

type OrderCardProps = {
  order: Order;
};

const VISIBLE_ITEMS = 2;
const PREVIEW_ITEMS = 2;

export default function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations('orders');
  const format = useFormatter();

  const [showAll, setShowAll] = React.useState(false);

  // =====================
  // Order Status Logic
  // =====================
  const state = order.status;

  const isCancelled = state === 'CANCELLED';
  const isDelivered = state === 'DELIVERED'; // لو الباك ضافه لاحقًا

  // =====================
  // Formatting
  // =====================
  const created = format.dateTime(new Date(order.createdAt), 'date-max');

  const formattedTotal = format.number(Number(order.total ?? 0), 'currency');

  // =====================
  // Payment
  // =====================
  const paymentMethodLabel =
    order.paymentMethod === 'CASH_ON_DELIVERY'
      ? t('payment.cash')
      : t('payment.creditCard');

  const PaymentIcon =
    order.paymentMethod === 'CASH_ON_DELIVERY' ? Banknote : CreditCard;

  // =====================
  // Global Status UI
  // =====================
  const globalStatus = isCancelled
    ? { label: t('statuses.cancelled'), className: 'bg-red-600 text-white' }
    : isDelivered
      ? { label: t('statuses.done'), className: 'bg-emerald-600 text-white' }
      : {
          label: t('statuses.inProgress'),
          className: 'bg-blue-600 text-white',
        };

  // =====================
  // Delivery UI
  // =====================
  const delivery = isCancelled
    ? {
        label: t('delivery.cancelled'),
        icon: TriangleAlert,
        className: 'text-red-600',
      }
    : isDelivered
      ? {
          label: t('delivery.delivered'),
          icon: CheckCircle2,
          className: 'text-emerald-600',
        }
      : {
          label: t('delivery.pending'),
          icon: Truck,
          className: 'text-amber-600',
        };

  const DeliveryIcon = delivery.icon;

  // =====================
  // Items logic
  // =====================
  const items = order.orderItems ?? [];

  const canToggle = items.length > VISIBLE_ITEMS;

  const isCollapsed = !showAll && canToggle;

  const maxItems = VISIBLE_ITEMS + PREVIEW_ITEMS;

  const displayedItems = showAll ? items : items.slice(0, maxItems);

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between bg-maroon-600 px-4 py-3 text-white dark:bg-maroon-700">
        <h3 className="text-xl font-semibold">
          {t('card.order')} {order.id.slice(0, 8)}
        </h3>

        <p className="text-base font-medium text-white/90">
          {t('card.createdIn')}: {created}
        </p>
      </div>

      {/* Summary */}
      <div className="bg-zinc-200 px-4 py-4 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
        {/* Price + Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300 pb-2 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-2xl font-medium">
              {t('card.totalPrice')}:{' '}
              <span className="font-bold">{formattedTotal}</span>
            </p>

            {order.paymentStatus === 'PAID' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                <Check className="size-4" />
                {t('card.paid')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">{t('card.status')}:</span>

            <span
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                globalStatus.className,
              )}
            >
              {globalStatus.label}
            </span>
          </div>
        </div>

        {/* Payment + Delivery */}
        <div className="grid grid-cols-1 gap-1 py-2">
          <p className="flex items-center gap-2">
            <span className="font-semibold">{t('card.paymentMethod')}:</span>

            <PaymentIcon className="size-4 text-zinc-500" />
            <span>{paymentMethodLabel}</span>
          </p>

          <p className="flex items-center gap-2">
            <span className="font-semibold">{t('card.deliveryStatus')}:</span>

            <DeliveryIcon className={cn('size-4', delivery.className)} />

            <span className={cn('font-semibold', delivery.className)}>
              {delivery.label}
            </span>
          </p>
        </div>

        {/* Items */}
        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
          {t('card.orderItems')}:
        </p>

        <div className="mt-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/40 md:p-6">
          <div className="relative">
            {/* Grid */}
            <div
              className={cn(
                'relative rounded-xl',
                isCollapsed && 'max-h-[320px] overflow-hidden md:max-h-[250px]',
              )}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {displayedItems.map((item, index) => {
                  const isPreview = !showAll && index >= VISIBLE_ITEMS;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        isPreview && 'pointer-events-none opacity-30',
                      )}
                    >
                      <OrderItem item={item} />
                    </div>
                  );
                })}
              </div>

              {/* Fade */}
              {isCollapsed && (
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 via-white/30 to-white/95 dark:from-zinc-950/5 dark:via-zinc-950/30 dark:to-zinc-950/95" />
              )}

              {/* Show More */}
              {isCollapsed && (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-sm font-semibold text-maroon-700 dark:text-softpink-400"
                >
                  <span>{t('card.showAll')}</span>
                  <ChevronDown className="mt-1 size-4" />
                </button>
              )}
            </div>

            {/* Show Less */}
            {showAll && canToggle && (
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="mx-auto mt-6 flex items-center gap-1 rounded-full border border-maroon-700 bg-white px-6 py-2 text-sm font-semibold text-maroon-700 dark:border-softpink-600 dark:bg-zinc-950 dark:text-softpink-400"
              >
                {t('card.showLess')}
                <ChevronUp className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
