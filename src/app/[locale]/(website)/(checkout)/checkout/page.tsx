import React from 'react';
import CheckoutLayout from './_components/checkout-layout';
import { CheckoutProvider } from '@/components/providers/app/checkout/payment-provider';
import MyAddresses from './_components/my-addresses';
import { getAddresses } from './_hooks/get-address';

export default async function page() {
  // Fetch Data From Server
  const { address, addressError } = await getAddresses();

  return (
    <>
      <CheckoutProvider>
        <CheckoutLayout
          myAddresses={<MyAddresses />}
          address={address}
          addressError={addressError}
        />
      </CheckoutProvider>
    </>
  );
}
