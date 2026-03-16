import React, { Suspense } from 'react';
import OccasionFilter from './occasion-filter';
import PriceFilter from './price-filter';
import { SearchParams } from '@/lib/types/global';
import ProductsList from '@/components/features/products/product-list';
import ProductsSkeleton from '@/components/skeletons/product/products-skeleton';
import CategoryFilter from './categories/categories-filter';
import RatingFilter from './rating/rating-filter';

type ProductsListProps = {
  searchParams: SearchParams;
};

export default function ProductContent({ searchParams }: ProductsListProps) {
  // Hook

  return (
    <div className="mx-20 mb-10 mt-20 flex-col items-start justify-center gap-5 lg:flex lg:flex-row lg:items-start lg:justify-center">
      {/* Filters */}
      <section className="flex w-full flex-col lg:max-w-[18.9125rem]">
        {/* Categories Filter */}
        <CategoryFilter />

        {/* Occasion Filter */}
        <OccasionFilter />

        {/* Price Filter */}
        <PriceFilter />

        {/* Price Filter */}
        <RatingFilter />
      </section>

      {/* Product List */}
      <section className="w-full lg:max-w-[61.625rem]">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
