import ProductsList from '@/components/features/products/product-list';
import { RouteProps } from '@/lib/types/global';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';


// Variables
  const pathName = `/products`;

export default function page({ searchParams }: RouteProps) {
  return (
    <div className=" grid grid-cols-12 gap-2 py-4">
      <div className="product-filters col-span-3">

        {/* <ProductsFilters /> */}

        
      </div>

      <Suspense fallback={<Loader className="animate-spin" />}>
        <ProductsList pathName={pathName} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
