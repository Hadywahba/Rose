import React from 'react';
import { RouteProps } from '@/lib/types/global';
import OrderContent from './_components/orders-content';

export default function page({ searchParams }: RouteProps) {
  return (
    <>
      <OrderContent searchParams={searchParams} />
    </>
  );
}
