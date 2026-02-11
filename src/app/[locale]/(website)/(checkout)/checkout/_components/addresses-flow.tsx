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

interface AddressesModalProps {
  userAddresses: Address[];
  selectedAddressId?: string;
  onSelectAddress?: (id: string) => void;
  trigger?: React.ReactNode;
}

type DialogStep = 'list' | 'form' | 'map';

export function AddressesModal({
  userAddresses,
  selectedAddressId,
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
        setStep('list');
      },
    });
  };

  const getDialogContentClass = () => {
    if (step === 'form' || step === 'map') {
      return 'max-h-[85vh] max-w-3xl py-5 overflow-auto';
    }
    return 'max-h-[85vh] max-w-3xl overflow-y-auto';
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Open Address Book</Button>}
      </DialogTrigger>
      <DialogContent className={cn(getDialogContentClass())}>
        <DialogHeader className="mt-2 flex flex-row items-center justify-between space-y-0 pb-4">
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
            selectedAddressId={selectedAddressId}
            onSelectAddress={onSelectAddress}
          />
        )}

        {step === 'form' && (
          <AddressForm
            data={formData as AddressFormSchema}
            onClose={() => setStep('list')}
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
