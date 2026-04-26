import { Delivery } from '@/lib/types/order/order';
import { cn } from '@/lib/utility/tailwind-merge';
import { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaymentAndDeliveryProps {
  paymentMethodLabel: string;
  PaymentIcon: LucideIcon;
  delivery: Delivery;
  DeliveryIcon: LucideIcon;
}
export default function PaymentAndDelivery({
  paymentMethodLabel,
  PaymentIcon,
  delivery,
  DeliveryIcon,
}: PaymentAndDeliveryProps) {
  // Translations
  const t = useTranslations('orders');

  return (
    <div className="grid grid-cols-1 gap-1 py-3">
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
  );
}
