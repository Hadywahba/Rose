'use client';

import React from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { Order } from '@/lib/types/order/order';
import {
  CheckCircle2,
  CreditCard,
  Banknote,
  TriangleAlert,
  Truck,
} from 'lucide-react';
import OrderHeader from './order-header';
import OrderSummary from './order-summary';
import PaymentAndDelivery from './order-payment';
import OrderItemsSection from './order-section';
import { useCurrency } from '@/lib/hooks/use-convert';

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  // Translations
  const t = useTranslations('orders');
  const format = useFormatter();

  // Hook
  const currency = useCurrency();

  // State
  const [showAll, setShowAll] = React.useState(false);

  // Variables
  const state = order.status;
  const isCancelled = state === 'CANCELLED';
  const isDelivered = state === 'DELIVERED';

  const created = format.dateTime(new Date(order.createdAt), 'date-max');

  const formattedTotal = `${format.number(
    Number(order.total ?? 0),
    'numbers',
  )} ${currency}`;

  const paymentMethodLabel =
    order.paymentMethod === 'CASH_ON_DELIVERY'
      ? t('payment.cash')
      : t('payment.creditCard');

  const PaymentIcon =
    order.paymentMethod === 'CASH_ON_DELIVERY' ? Banknote : CreditCard;

  const globalStatus = isCancelled
    ? { label: t('statuses.cancelled'), className: 'bg-red-500 text-white' }
    : isDelivered
      ? { label: t('statuses.done'), className: 'bg-emerald-500 text-white' }
      : {
          label: t('statuses.inProgress'),
          className: 'bg-blue-500 text-white',
        };

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

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950">
      <OrderHeader order={order} created={created} />

      <div className="px-5 py-5">
        <OrderSummary
          order={order}
          formattedTotal={formattedTotal}
          globalStatus={globalStatus}
        />

        <PaymentAndDelivery
          paymentMethodLabel={paymentMethodLabel}
          PaymentIcon={PaymentIcon}
          delivery={delivery}
          DeliveryIcon={DeliveryIcon}
          order={order}
        />

        <OrderItemsSection
          order={order}
          showAll={showAll}
          setShowAll={setShowAll}
        />
      </div>
    </article>
  );
}
