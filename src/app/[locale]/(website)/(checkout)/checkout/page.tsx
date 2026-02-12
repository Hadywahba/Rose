import React from 'react';
import CheckoutLayout from './_components/checkout-layout';
import { CheckoutProvider } from '@/components/providers/app/checkout/payment-provider';

export default function page() {
  return (
    <>
      <CheckoutProvider>
        <CheckoutLayout />
      </CheckoutProvider>
    </>
  );
}
