'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Address } from '@/lib/types/user-addresses';
import AddressForm from './add-address-form';
import AddressSelector from './address-selector';
import { cn } from '@/lib/utility/tailwind-merge';
import MapSelector from './map-selector';
import { AddressFormSchema } from '@/lib/schema/address.schema';
import { useAddAddress } from '../_hooks/use-address';
import { useRouter } from '@/i18n/navigation';

interface AddressesModalProps {
  userAddresses: Address[];
  onSelectAddress?: (id: string) => void;
  trigger?: React.ReactNode;
}

type DialogStep = 'list' | 'form' | 'map';

export function AddressesModalFlow({
  userAddresses,
  onSelectAddress,
  trigger,
}: AddressesModalProps) {
  const [step, setStep] = useState<DialogStep>('list');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AddressFormSchema>>({
    username: '',
    city: '',
    street: '',
    phone: '',
    lat: '',
    long: '',
  });

  const router = useRouter();
  const { isPending, addAddress } = useAddAddress();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep('list');
      setFormData({
        username: '',
        city: '',
        street: '',
        phone: '',
        lat: '',
        long: '',
      });
    }
  };

  const handleFormComplete = (
    data: Omit<AddressFormSchema, 'lat' | 'long'>,
  ) => {
    // Save form data and go to map
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    setStep('map');
  };

  const handleMapSubmit = (location: { lat: number; lng: number }) => {
    // Combine form data with coordinates and submit
    const completeData: AddressFormSchema = {
      ...formData,
      lat: location.lat.toString(),
      long: location.lng.toString(),
    } as AddressFormSchema;

    addAddress(completeData, {
      onSuccess: () => {
        setFormData({
          username: '',
          city: '',
          street: '',
          phone: '',
          lat: '',
          long: '',
        });
        router.refresh();
        setStep('list');
      },
    });
  };

const getDialogContentClass = () => {
  const baseClasses = 'max-h-[85vh] max-w-3xl dark:bg-zinc-800 transition-all';

  if (step === 'map') {
    return cn(baseClasses, 'py-4 overflow-hidden'); // No scroll for map
  }

  if (step === 'form') {
    return cn(baseClasses, 'py-4 overflow-y-auto');
  }

  return cn(baseClasses, 'overflow-y-auto'); // List view
};

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Open Address Book</Button>}
      </DialogTrigger>
      <DialogContent className={cn(getDialogContentClass())}>
        <DialogHeader className="mt-2 flex flex-row items-center justify-between space-y-0 ">
          <DialogTitle className="text-2xl font-bold">
            {step === 'list' && 'My Addresses'}
            {(step === 'form' || step === 'map') && 'Add New Address'}
          </DialogTitle>

          {step === 'list' && (
            <Button
              onClick={() => setStep('form')}
              className="ml-auto bg-maroon-50 text-maroon-600 hover:bg-maroon-100"
            >
              Add a New Address
            </Button>
          )}
        </DialogHeader>

        {step === 'list' && (
          <AddressSelector
            userAddresses={userAddresses}
            onSelectAddress={onSelectAddress}
          />
        )}

        {step === 'form' && (
          <AddressForm
            data={formData as AddressFormSchema}
            onBack={() => setStep('list')}
            onFormComplete={handleFormComplete}
          />
        )}

        {step === 'map' && (
          <MapSelector
            initialPosition={
              formData.lat && formData.long
                ? {
                    lat: parseFloat(formData.lat),
                    lng: parseFloat(formData.long),
                  }
                : undefined
            }
            onSubmit={handleMapSubmit}
            onBack={() => setStep('form')}
            isPending={isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
