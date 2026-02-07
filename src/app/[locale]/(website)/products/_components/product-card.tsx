'use client';

import Image from 'next/image';
import { UseProduct } from '../_hooks/use-product';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types/product/product';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utility/tailwind-merge';

// Constant
const TOTAL_STAR = 5;

export default function ProductCard() {
  // Hook
  const { product } = UseProduct();
    const locale = useLocale();
  return (
    <>
      {product?.products?.map((prod: Product) => (
        <section key={prod._id} className={cn('w-full' , locale ==='ar' ? "pr-3" :"pl-3")}>
          <figure className="flex flex-col gap-4">
            <Image
              src={prod.imgCover}
              width={302}
              height={272}
              alt="gift"
              priority
              className="h-full max-h-[17rem] rounded-xl"
            />
            <figcaption>
              <h1 className="pb-3 text-lg font-semibold capitalize text-maroon-700 dark:text-pink-200">
                {prod.title.split(' ').splice(0, 3).join(' ')}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center justify-start gap-1">
                    {Array.from({ length: TOTAL_STAR }).map((_, index) => {
                      const isFilled = index < Math.floor(prod.rateAvg);
                      return (
                        <Star
                          key={index}
                          fill={isFilled ? 'orange' : 'none'}
                          stroke={isFilled ? 'orange' : 'gray'}
                          className="h-4 w-4"
                        />
                      );
                    })}
                  </div>
                  <p className="pt-3 text-base font-medium text-maroon-700">
                    {prod.priceAfterDiscount} EGP
                    <span className="pl-2 text-base font-medium text-zinc-400 line-through">
                      {prod.price} EGP
                    </span>
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon-600">
                  <ShoppingCart className="text-2xl text-white" />
                </div>
              </div>
            </figcaption>
          </figure>
        </section>
      ))}
    </>
  );
}
