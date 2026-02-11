import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import { Eye, ShoppingCart } from 'lucide-react';
import { RatingStars } from '@/components/ui/ring-stars';
import { Button } from '@/components/ui/button';
import ProductCardWhishlistButtons from './product-card-whishlist-button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utility/tailwind-merge';

// Types
type ProductCardProps = {
  src: StaticImageData | string;
  title?: string;
  rate?: number;
  rateCount?: number;
  priceBeforeSale: number;
  priceAfterSale?: number;
  salesCount?: number;
  productId: string;
  className?: string;
  showWishListBtn?: boolean;
};

export default function ProductCard({
  src,
  productId,
  rate = 0,
  title = 'Flower App',
  salesCount = 0,
  priceAfterSale = 0,
  priceBeforeSale = 0,
  showWishListBtn = false,

  className,
}: ProductCardProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-t-xl dark:shadow-zinc-200',
        arabic ? 'lg:pr-3' : 'lg:pl-3',
        className,
      )}
    >
      <Link
        locale={locale}
        href={`/products/${productId}`}
        className="group relative inline-block aspect-[5/5] w-full overflow-hidden rounded-xl"
      >
        <Image
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          src={src}
          alt={title}
          fill
        />

        {/* Red Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex translate-y-full items-center justify-center bg-red-600/60 transition-transform delay-300 duration-500 ease-out group-hover:translate-y-0">
          <Eye className="h-8 w-8 text-white opacity-0 transition-all delay-300 duration-300 group-hover:scale-110 group-hover:opacity-100" />
        </div>
      </Link>

      <h2 className="dark:text-soft-pink-200 pb-3 text-xl font-semibold text-maroon-700">
        {title.split(' ').splice(0, 3).join(' ')}
      </h2>
      <div className="flex items-center justify-between pb-2">
        <div className="flex flex-col">
          {/* stars-component */}
          <RatingStars rateAvg={rate} />
          <div className="flex pt-3">
            <span className="dark:text-soft-pink-200 text-base font-medium text-maroon-700">
              {arabic
                ? t('price-number-currancy-base-0', { price: priceAfterSale })
                : t('price-number-currancy-base-0', {
                    price: priceAfterSale,
                  }).replace(/^(\D+)?(\d+(\.\d+)?)/, '$2\u00A0$1')}
            </span>
            <span
              className={cn(
                'text-base text-zinc-400 line-through dark:text-zinc-500',
                arabic ? 'pr-3' : 'pl-3',
              )}
            >
              {arabic
                ? t('price-number-currancy-base-0', { price: priceBeforeSale })
                : t('price-number-currancy-base-0', {
                    price: priceBeforeSale,
                  }).replace(/^(\D+)?(\d+(\.\d+)?)/, '$2\u00A0$1')}
            </span>
          </div>
        </div>
        <Button className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon-600">
          <ShoppingCart size={40} />
        </Button>
      </div>

      {salesCount > 5 && (
        <div className="badge absolute end-4 top-3">
          <Badge
            className="z-10 h-6 w-fit text-base font-medium dark:bg-softpink-200"
            variant={'secondary'}
          >
            {t('hot-0')}
          </Badge>
        </div>
      )}

      {/*add & remove whishlist-buttons */}
      <div className="pointer-events-auto absolute top-0">
        {showWishListBtn && (
          <ProductCardWhishlistButtons productId={productId} />
        )}
      </div>
    </div>
  );
}
