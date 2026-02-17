import React from 'react';
import ProductContent from './_components/product-content';
import { RouteProps } from '@/lib/types/global';

export default function page({ searchParams }: RouteProps) {
  return (
    <>
      <ProductContent searchParams={searchParams} />
    </>
  );
}
