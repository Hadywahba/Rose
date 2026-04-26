import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { OrderItem } from '@/lib/types/order/order';

type OrderItemProps = {
  item: OrderItem;
};

export default function OrderItems({ item }: OrderItemProps) {
   // Translations
  const t = useTranslations('orders');
  const format = useFormatter();

   // Variables
  const title = item.product?.title ?? t('item.productFallback');
  const img = item.product?.cover || '/images/galleryGrid3.svg';
  const price = item.price ?? 0;
  const rateAvg = Number(item.product?.rating ?? 0);
  const rateCount = Number(item.product?.ratings ?? 0);
  const formattedPrice = format.number(Number(price), 'currancy-base');

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-3 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      {/* Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <Image src={img} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute bottom-1 right-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
          x{item.quantity}
        </span>
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold text-maroon-700 dark:text-softpink-400">
          {title}
        </h4>

        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.round(rateAvg) ? 'fill-amber-400 text-amber-400' : 'fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700'}`}
            />
          ))}
          <span className="ml-1 text-xs text-zinc-400">({rateCount})</span>
        </div>

        <p className="mt-2 text-base font-extrabold text-zinc-800 dark:text-zinc-50">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}
