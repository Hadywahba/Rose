import { Delivery, Order } from '@/lib/types/order/order';
import { cn } from '@/lib/utility/tailwind-merge';
import { LucideIcon, MapPin, NotebookPen } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaymentAndDeliveryProps {
  paymentMethodLabel: string;
  PaymentIcon: LucideIcon;
  delivery: Delivery;
  DeliveryIcon: LucideIcon;
  order: Order;
}

export default function PaymentAndDelivery({
  paymentMethodLabel,
  PaymentIcon,
  delivery,
  DeliveryIcon,
  order,
}: PaymentAndDeliveryProps) {
   // Translations
  const t = useTranslations('orders');

   // Variables
  const deliveryBg = delivery.className.includes('red')
    ? 'bg-red-50 dark:bg-red-900/30'
    : delivery.className.includes('emerald')
      ? 'bg-emerald-50 dark:bg-emerald-900/30'
      : 'bg-amber-50 dark:bg-amber-900/30';

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {/* Payment Method */}
      <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
          <PaymentIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{t('card.paymentMethod')}</p>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{paymentMethodLabel}</p>
        </div>
      </div>

      {/* Delivery Status */}
      <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
        <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', deliveryBg)}>
          <DeliveryIcon className={cn('h-4 w-4', delivery.className)} />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{t('card.deliveryStatus')}</p>
          <p className={cn('text-sm font-semibold', delivery.className)}>{delivery.label}</p>
        </div>
      </div>

      {/* Address */}
      {order.address && (
        <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon-50 dark:bg-maroon-900/30">
            <MapPin className="h-4 w-4 text-maroon-600 dark:text-softpink-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{t('card.address')}</p>
            <p className="truncate text-sm font-semibold capitalize text-zinc-800 dark:text-zinc-100">
              {order.address.title} — {order.address.city}
            </p>
            <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">{order.address.street}</p>
          </div>
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30">
            <NotebookPen className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{t('order-notes')}</p>
            <p className="truncate text-sm font-semibold text-green-700 dark:text-green-400">{order.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}
