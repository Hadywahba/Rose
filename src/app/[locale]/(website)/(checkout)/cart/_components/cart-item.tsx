'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, X } from 'lucide-react';
import CartAction from './cart-action';
import { cn } from '@/lib/utility/tailwind-merge';
import { CartItemsUI } from '@/lib/types/cart/cart';

// Types
type cartItemProp = {
  cartInfo: CartItemsUI;
  className?: string;
};

export default function CartItem({ cartInfo, className }: cartItemProp) {
  const t = useTranslations();

  const { product, quantity, id } = cartInfo;

  return (
    <div
      className={cn(
        'flex flex-col gap-4 py-3 md:flex-row md:justify-between',
        className,
      )}
    >
      <div className="cart-info flex flex-col gap-3 md:flex-row">
        {/* Image */}
        <div className="imge w-full overflow-hidden rounded-md md:w-auto">
          <Image
            className="h-auto w-full object-cover md:w-[150px]"
            src={product.cover || '/placeholder.png'}
            alt={product.title}
            width={150}
            height={150}
          />
        </div>

        {/* Details */}
        <div className="details flex flex-col justify-between">
          <div className="text-info">
            {/* title */}
            <h1 className="text-lg font-semibold capitalize">
              {product.title}
            </h1>

            {/* rating */}
            <div className="rating-info my-3 flex h-14 gap-2">
              <Star fill="orange" stroke="orange" />

              <span>
                {t('rating')}:{product.rating}/{product.ratings}
              </span>

              <span className="text-nowrap font-medium text-blue-600">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* price & quantity */}
          <div className="product-price-count mt-2 md:mt-0">
            <p className="inline-flex items-baseline gap-1 whitespace-nowrap">
              <span className="flex items-center font-bold text-maroon-600 dark:text-maroon-50">
                (<X size={16} className="inline" />
                {quantity})
              </span>

              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                {quantity * Number(product.price)}
              </span>

              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t('egp')}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* actions */}
      <CartAction
        productQuantity={product.stock}
        quantityInCart={quantity}
        cartItemId={id}
      />
    </div>
  );
}
