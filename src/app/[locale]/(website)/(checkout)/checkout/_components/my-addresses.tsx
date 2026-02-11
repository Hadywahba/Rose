'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { RadioGroup } from '@radix-ui/react-radio-group';
import AddressCard from './address-card';

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
  onEditAddress?: (id: string) => void;
  onDeleteAddress?: (id: string) => void;
  onSelectAddress?: (id: string) => void;
  selectedAddressId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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

export function MyAddresses({
  addresses = defaultAddresses,
  onAddAddress,

  onSelectAddress,
  selectedAddressId,
  open,
  onOpenChange,
  trigger,
}: AddressBookModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(selectedAddressId);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const handleSelectAddress = (id: string) => {
    setSelectedId(id);
    onSelectAddress?.(id);
  };



  const handleAddNew = () => {
    onAddAddress?.();
  };

  // Group addresses by category
  const groupedAddresses = addresses.reduce(
    (acc, address) => {
      const category = address.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(address);
      return acc;
    },
    {} as Record<string, Address[]>,
  );

  return (
    <Dialog open={currentOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Open Address Book</Button>}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold">My Addresses</DialogTitle>
          <Button
            onClick={handleAddNew}
            className="ml-auto bg-red-100 text-red-600 hover:bg-red-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add a New Address
          </Button>
        </DialogHeader>

        {/* <div className="space-y-6"> */}
        <RadioGroup value={selectedId} onValueChange={handleSelectAddress}>
          {Object.entries(groupedAddresses).map(
            ([category, categoryAddresses]) => (
              <div key={category} className="space-y-3">
                {/* Category Header */}
                <div className="mb-4 flex items-center gap-3">
                  <h3
                    className={`text-lg font-semibold ${addresses.find((a) => a.category === category)?.categoryColor || 'text-red-600'}`}
                  >
                    {category}
                  </h3>
                </div>

                {/* Address Items */}
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
            ),
          )}
        </RadioGroup>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
}
