import React from 'react';
import CheckoutLayout from './_components/checkout-layout';
import { CheckoutProvider } from '@/components/providers/app/checkout/payment-provider';
import MyAddresses from './_components/my-addresses';

export default function page() {
  return (
    <>
      <CheckoutProvider>
        <CheckoutLayout myAddresses={<MyAddresses />} />
      </CheckoutProvider>
    </>
  );
}
