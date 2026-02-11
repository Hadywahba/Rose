'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import React, { useState } from 'react';
import { Address } from './my-addresses';
import AddressCard from './address-card';

interface AddressSelectorProps {
  groupedAddresses: Record<string, Address[]>;
  selectedAddressId?: string;
  onSelectAddress?: (id: string) => void;
}

export default function AddressSelector({
  groupedAddresses,
  selectedAddressId,
  onSelectAddress,
}: AddressSelectorProps) {
  const [selectedId, setSelectedId] = useState(selectedAddressId ?? '');

  const handleSelectAddress = (id: string) => {
    setSelectedId(id);
    onSelectAddress?.(id);
  };

  return (
    <RadioGroup value={selectedId} onValueChange={handleSelectAddress}>
      {Object.entries(groupedAddresses).map(([category, categoryAddresses]) => (
        <div key={category} className="space-y-3">
          <div className="mb-4 flex items-center gap-3">
            <h3
              className={`text-lg font-semibold ${categoryAddresses[0]?.categoryColor || 'text-red-600'}`}
            >
              {category}
            </h3>
          </div>

          <div className="space-y-3">
            {categoryAddresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                selected={selectedId === address.id}
              />
            ))}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
