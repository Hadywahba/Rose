'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import React, { useState } from 'react';
import AddressCard from './address-card';
import { Address } from '@/lib/types/user-addresses';

interface AddressSelectorProps {
  userAddresses: Address[];
  onSelectAddress?: (id: string) => void;
}

export default function AddressSelector({
  userAddresses,
  onSelectAddress,
}: AddressSelectorProps) {
  const [selectedId, setSelectedId] = useState('');

  const handleSelectAddress = (id: string) => {
    setSelectedId(id);
    onSelectAddress?.(id);
  };
  

  return (
    <RadioGroup value={selectedId} onValueChange={handleSelectAddress}>
      <div className="space-y-3">
        {userAddresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            selected={selectedId === address._id}
          />
        ))}
      </div>
    </RadioGroup>
  );
}
