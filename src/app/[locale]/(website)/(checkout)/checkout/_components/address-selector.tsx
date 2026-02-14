'use client';

import { useTranslations } from 'next-intl';
import AddressCard from './address-card';
import { Address } from '@/lib/types/user-addresses';

interface AddressSelectorProps {
  userAddresses: Address[];
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
  pendingDelete: boolean;
}

export default function AddressSelector({
  userAddresses,
  onEditAddress,
  onDeleteAddress,
  pendingDelete,
}: AddressSelectorProps) {
  // Translations
  const t = useTranslations('my-addresses');

  // group addresses by category
  const groupedAddresses = userAddresses.reduce<Record<string, Address[]>>(
    (acc, address) => {
      const category = address.username;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(address);
      return acc;
    },
    {},
  );

  if (!userAddresses.length) {
    return <p className="text-maroon-600">{t('no-addresses-found')}</p>;
  }

  return (
    <div dir='ltr' className="space-y-6">
      {Object.entries(groupedAddresses).map(([category, categoryAddresses]) => {
        return (
          <div key={category} className="space-y-3">
            {/* Category header */}
            <h3 className="text-xl font-semibold text-maroon-600 dark:text-softpink-200">
              {category}
            </h3>

            {/* Addresses */}
            <div className="space-y-3">
              {categoryAddresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  handleDeleteAddress={onDeleteAddress}
                  onEditAddress={onEditAddress}
                  pendingDelete={pendingDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
