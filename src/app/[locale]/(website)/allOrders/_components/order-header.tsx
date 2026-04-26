import { Order } from '@/lib/types/order/order';
import { Package } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface OrderHeaderProps {
  created: string;
  order: Order;
}

export default function OrderHeader({ created, order }: OrderHeaderProps) {
  // Translations
  const t = useTranslations('orders');

  return (
    <div className="flex flex-col gap-2 bg-gradient-to-r from-maroon-700 to-maroon-500 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
          <Package className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/70">
            {t('title-order')}
          </p>
          <h3 className="font-mono text-base font-bold tracking-wider">
            #{order.id.slice(0, 8).toUpperCase()}
          </h3>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs font-medium uppercase tracking-widest text-white/70">
          {t('title-created')}
        </p>
        <p className="text-sm font-semibold">{created}</p>
      </div>
    </div>
  );
}
