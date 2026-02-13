'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import React, { useState } from 'react';
import AddressCard from './address-card';
import { Address } from '@/lib/types/user-addresses';
import { useDeleteAddress } from '../_hooks/use-delete-address';

interface AddressSelectorProps {
  userAddresses: Address[];
}

export default function AddressSelector({
  userAddresses,
}: AddressSelectorProps) {

  // Hook
  const { pendingDelete, deleteAddress } = useDeleteAddress();

    const handleDeleteAddress = (id: string) => {
      deleteAddress(id)
    };
  

  return (
    <div >
      <div className="space-y-3">
        {userAddresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            handleDeleteAddress={handleDeleteAddress}
            pendingDelete={pendingDelete}
          />
        ))}
      </div>
    </div>
  );
}
