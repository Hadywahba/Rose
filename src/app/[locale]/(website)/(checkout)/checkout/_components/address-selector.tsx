'use client';

import ListError from '@/components/error/list-error';
import AddressCard from './address-card';
import { Address } from '@/lib/types/address/address';

interface AddressSelectorProps {
  userAddresses: Address[];
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
  pendingDelete: boolean;
  addressError: Error | null;
}

export default function AddressSelector({
  userAddresses,
  onEditAddress,
  onDeleteAddress,
  pendingDelete,
  addressError,
}: AddressSelectorProps) {
  // group addresses by category
  const groupedAddresses = (userAddresses ?? []).reduce<
    Record<string, Address[]>
  >((acc, address) => {
    const category = address.title;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(address);
    return acc;
  }, {});

  return (
    <ListError errors={addressError}>
      <div dir="ltr" className="space-y-6">
        {Object.entries(groupedAddresses).map(
          ([category, categoryAddresses]) => {
            return (
              <div key={category} className="space-y-3">
                {/* Category header */}
                <h3 className="text-xl font-semibold text-maroon-600 dark:text-softpink-200">
                  {category}
                </h3>

                {/* Addresses */}
                <div className="space-y-2">
                  {categoryAddresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      handleDeleteAddress={onDeleteAddress}
                      onEditAddress={onEditAddress}
                      pendingDelete={pendingDelete}
                    />
                  ))}
                </div>
              </div>
            );
          },
        )}
      </div>
    </ListError>
  );
}
