'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, X } from 'lucide-react';
import CartAction from './cart-action';
import { CartItemResponse, CartItemUI } from '@/lib/types/cart';
import { cn } from '@/lib/utility/tailwind-merge';
//Types
type cartItemProp = {
  cartInfo: CartItemResponse | CartItemUI;
  className?: string;
};
export default function CartItem({
  cartInfo: {
    product: {
      rateAvg,
      rateCount,
      imgCover,
      _id,
      title,
      quantity: productQuantity,
    },
    quantity,
    price,
  },
  className,
}: cartItemProp) {
  // Translations
  const t = useTranslations();

  // Variables
  const safeRateAvg = rateAvg ?? 0;
  const safeRateCount = rateCount ?? 0;

  const productRating =
    safeRateCount > 0 ? String(safeRateAvg / safeRateCount) : '0';
  return (
    <div
      className={cn(
        'flex flex-col gap-4 py-3 md:flex-row md:justify-between',
        className,
      )}
    >
      <div className="cart-info flex flex-col gap-3 md:flex-row">
        <div className="imge w-full overflow-hidden rounded-md md:w-auto">
          <Image
            className="h-auto w-full object-cover md:w-[150px]"
            src={imgCover}
            alt="title"
            width={150}
            height={0}
          />
        </div>
        <div className="details flex flex-col justify-between">
          <div className="text-info">
            {/* title */}
            <h1 className="text-lg font-semibold capitalize">{title}</h1>
            {/* rating-info */}
            <div className="rating-info my-3 flex h-14 gap-2">
              <Star fill="orange" stroke="orange" />
              <span>
                {t('rating')}:
                {t('rateavg-number-number-base', { rateAvg: safeRateAvg })}/
                {t('ratecount-number-number-base', {
                  rateCount: safeRateCount,
                })}
              </span>
              <span className="text-nowrap font-medium text-blue-600">
                {t('count-plural-0-no-ratings-1-rating-other-ratings', {
                  count: productRating,
                })}
              </span>
            </div>
          </div>
          <div className="product-price-count mt-2 md:mt-0">
            <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
              <span className="flex items-center font-bold text-maroon-600 dark:text-maroon-50">
                {/* quantity in cart */}
                (<X size={16} className="inline" />
                {t('quantity-number-number-base', { quantity })} )
              </span>
              {/* total price of item in cart */}
              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                {t('productprice-number-number-base', {
                  productPrice: quantity * price,
                })}
              </span>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t('egp')}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* update-remove-buttons */}
      <CartAction
        productId={_id}
        productQuantity={productQuantity}
        quantityInCart={quantity}
      />

      
    </div>
  );
}
