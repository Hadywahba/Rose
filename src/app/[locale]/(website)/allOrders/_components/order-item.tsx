import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { OrderItem as OrderItemType } from '@/lib/types/order';
import { Star } from 'lucide-react';

type OrderItemProps = {
  item: OrderItemType;
};

export default function OrderItem({ item }: OrderItemProps) {
  // Translation
  const t = useTranslations('orders');

  // Formatter
  const format = useFormatter();

  // Variables
  const title = item.product?.title ?? t('item.productFallback');
  const img = item.product?.imgCover || '/images/galleryGrid3.svg';
  const price = item.price ?? 0;
  const rateAvg = Number(item.product?.rateAvg ?? 0);
  const rateCount = Number(item.product?.rateCount ?? 0);
  const formattedPrice = format.number(price, 'currancy-base');

  return (
    <div className="flex h-[132px] items-center gap-4 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {/* Product Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        {/* Title */}
        <h4 className="truncate text-sm font-semibold text-maroon-700 dark:text-softpink-400">
          {title}
        </h4>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-200">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-medium">
            {t('item.rating')}: {rateAvg}/5
          </span>
          <span className="text-blue-600 dark:text-blue-400">
            ({rateCount} {t('item.ratings')})
          </span>
        </div>

        {/* Quantity & Price */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-maroon-500 dark:text-softpink-300">
            (x{item.quantity})
          </span>
          <span className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
