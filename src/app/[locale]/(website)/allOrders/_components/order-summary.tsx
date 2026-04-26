import { GlobalStatus, Order } from '@/lib/types/order/order';
import { formatCurrency } from '@/lib/utility/convert-numbers';
import { cn } from '@/lib/utility/tailwind-merge';
import { BadgeCheck, Clock, Loader2 } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

interface OrderSummaryProps {
  formattedTotal: string;
  globalStatus: GlobalStatus;
  order: Order;
}

export default function OrderSummary({
  order,
  globalStatus,
  formattedTotal,
}: OrderSummaryProps) {
  // Translations
  const t = useTranslations('orders');
  const format = useFormatter();
  const locale = useLocale();

  // Variables
  const discount = Number(order.discount ?? 0);
  const shipping = Number(order.shipping ?? 0);
  const subtotal = formatCurrency(format, Number(order.subtotal ?? 0), locale);
  const formattedDiscount = formatCurrency(format, discount, locale);
  const formattedShipping = formatCurrency(format, shipping, locale);

  const paymentStatusBadge =
    order.paymentStatus === 'PAID'
      ? {
          icon: BadgeCheck,
          label: t('card.paid'),
          className:
            'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-800',
        }
      : order.paymentStatus === 'PROCESSING'
        ? {
            icon: Loader2,
            label: t('card.processing'),
            className:
              'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-800',
          }
        : {
            icon: Clock,
            label: t('card.pendingPayment'),
            className:
              'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-800',
          };

  const PaymentStatusIcon = paymentStatusBadge.icon;

  return (
    <div className="border-b border-zinc-200 pb-4 dark:border-zinc-700">
      {/* Top row: total + status */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {t('card.totalPrice')}
          </span>
          <span className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-50">
            {formattedTotal}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1',
              paymentStatusBadge.className,
            )}
          >
            <PaymentStatusIcon className="h-3.5 w-3.5" />
            {paymentStatusBadge.label}
          </span>
          <span
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-bold tracking-wide shadow-sm',
              globalStatus.className,
            )}
          >
            {globalStatus.label}
          </span>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          {t('card.subtotal')}:{' '}
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            {subtotal}
          </span>
        </span>
        {discount > 0 && (
          <span className="text-emerald-600 dark:text-emerald-400">
            {t('card.discount')}:{' '}
            <span className="font-semibold">-{formattedDiscount}</span>
          </span>
        )}
        <span>
          {t('card.shipping')}:{' '}
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            {shipping === 0 ? t('card.freeShipping') : formattedShipping}
          </span>
        </span>
      </div>
    </div>
  );
}
