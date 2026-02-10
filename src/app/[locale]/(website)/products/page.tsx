import ProductsList from '@/components/features/products/product-list';
import { RouteProps } from '@/lib/types/global';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';


// Variables
  const pathName = `/products`;

export default function page({ searchParams }: RouteProps) {
  return (
    <div className="bg-red-200">
      <h1>product</h1>

      <Suspense fallback={<Loader className="animate-spin" />}>
        <ProductsList pathName={pathName} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
