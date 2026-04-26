import { GlobalStatus, Order } from '@/lib/types/order/order';
import { cn } from '@/lib/utility/tailwind-merge';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
interface OrderSummary {
  formattedTotal: string;
  globalStatus: GlobalStatus;
  order: Order;
}
export default function OrderSummary({
  order,
  globalStatus,
  formattedTotal,
}: OrderSummary) {
  // Translation
  const t = useTranslations('orders');

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300 pb-2 dark:border-zinc-800">
      <div className="flex items-center gap-3">
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

      <span
        className={cn(
          'rounded-full px-3 py-1 text-xs font-semibold',
          globalStatus.className,
        )}
      >
        {globalStatus.label}
      </span>
    </div>
  );
}
