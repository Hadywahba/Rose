'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/lib/types/products/product';
import { RelatedProduct } from '@/lib/types/products/reviews/related-products';

// Types
type SearchProps = {
  src: StaticImageData | string;
  title?: string;
  rate: number;
  rateCount?: number;
  priceBeforeSale: number;
  priceAfterSale: number;
  salesCount: number;
  productId: string;
  className?: string;
  createdAt: string;
  showWishListBtn?: boolean;
  quantity: number;
  product: Product | RelatedProduct;
};

export default function ProductSearch({
  src,
  rate,
  rateCount = 0,
  title = 'Flower App',
  priceAfterSale,
  priceBeforeSale,
}: SearchProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b p-3">
      {/* Left: Image + Info */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Image */}
        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={src}
            alt={title}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Title + Price */}
        <div>
          <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            {title}
          </h3>

          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {priceAfterSale ?? priceBeforeSale} EGP
          </p>
        </div>
      </div>

      {/* Right: Rating */}
      <div className="flex min-w-[140px] items-center justify-end gap-1 text-sm text-zinc-600 dark:text-zinc-100">
        <Star size={16} className="fill-yellow-500 text-yellow-500" />
        <span className="text-sm font-normal">rating</span>
        <span className="font-semibold">{rate} / 5</span>
        <span className="text-blue-500">({rateCount} ratings)</span>
      </div>
    </div>
  );
}
