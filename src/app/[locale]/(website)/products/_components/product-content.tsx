import React from 'react';
import OccasionFilter from './occasion-filter';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utility/tailwind-merge';
import PriceFilter from './price-filter';
import ProductList from './product-list';

export default function ProductContent() {
  // Hook
  const locale = useLocale();
  return (
    <div className="mx-20 mb-10 mt-20 flex-col items-start justify-center gap-5 lg:flex lg:flex-row lg:items-start lg:justify-center">
      {/* Filters */}
      <section className="flex w-full flex-col lg:max-w-[18.9125rem]">
        {/* Occasion Filter */}
        <OccasionFilter />

        {/* Price Filter */}
        <PriceFilter />
      </section>

      {/* Product List */}
      <section
        className={cn(
          'w-full border-zinc-100 lg:max-w-[61.625rem]',
          locale === 'ar' ? 'border-r-2 pl-2' : 'border-l-2',
        )}
      >
        <ProductList />
      </section>
    </div>
  );
}
