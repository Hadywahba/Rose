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

interface AddressBookModalProps {
  onAddAddress?: () => void;
  onSelectAddress?: (id: string) => void;
  selectedAddressId?: string;
  trigger?: React.ReactNode;
}

export async function MyAddresses({
  onAddAddress,
  onSelectAddress,
  selectedAddressId,
  trigger,
}: AddressBookModalProps) {
  const userAddresses = await getUserAddresses();

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
          userAddresses={userAddresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={onSelectAddress}
        />
      </DialogContent>
    </Dialog>
  );
}
