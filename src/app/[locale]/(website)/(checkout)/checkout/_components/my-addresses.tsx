import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddressSelector from './address-selector';
import { getUserAddresses } from '@/lib/services/addresses/get-user-addresses';

export interface Address {
  id: string;
  category: string;
  title: string;
  city: string;
  phone: string;
  fullAddress: string;
  categoryColor?: string;
  badge?: string;
  badgeColor?: string;
}

interface AddressBookModalProps {
  addresses?: Address[];
  onAddAddress?: () => void;
  onSelectAddress?: (id: string) => void;
  selectedAddressId?: string;
  trigger?: React.ReactNode;
}

const defaultAddresses: Address[] = [
  {
    id: '1',
    category: 'Home',
    title: 'Giza',
    city: 'Giza',
    phone: '+201012346578',
    fullAddress: '21 Ahmed Mohamed St., King Faisal St., Giza',
    categoryColor: 'text-red-600',
    badgeColor: 'bg-transparent',
  },
  {
    id: '2',
    category: 'Work',
    title: 'Cairo',
    city: 'Cairo',
    phone: '+201112345678',
    fullAddress: '14 Omar Ibn Akhatab St., Ramsis St., Cairo',
    categoryColor: 'text-red-600',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: '3',
    category: 'Family',
    title: 'Alexandria',
    city: 'Alexandria',
    phone: '+201512345678',
    fullAddress: '16 El-Gaish Rd, San Stefano, El-Raml 2, Alexandria',
    categoryColor: 'text-red-600',
    badgeColor: 'bg-transparent',
  },
  {
    id: '4',
    category: 'Work',
    title: 'Cairo',
    city: 'Cairo',
    phone: '+201112345678',
    fullAddress: '14 Omar Ibn Akhatab St., Ramsis St., Cairo',
    categoryColor: 'text-red-600',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
];

export async function MyAddresses({
  addresses = defaultAddresses,
  onAddAddress,
  onSelectAddress,
  selectedAddressId,
  trigger,
}: AddressBookModalProps) {
  const userAddresses = await getUserAddresses();
  console.log(userAddresses);
  
  const groupedAddresses = addresses.reduce(
    (acc, address) => {
      const category = address.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(address);
      return acc;
    },
    {} as Record<string, Address[]>,
  );


  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Open Address Book</Button>}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
        <DialogHeader className="mt-2 flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold">My Addresses</DialogTitle>
          <Button
            onClick={onAddAddress}
            className="ml-auto bg-maroon-50 text-maroon-600 hover:bg-maroon-100"
          >
            Add a New Address
          </Button>
        </DialogHeader>

        <AddressSelector
          groupedAddresses={groupedAddresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={onSelectAddress}
        />
      </DialogContent>
    </Dialog>
  );
}
