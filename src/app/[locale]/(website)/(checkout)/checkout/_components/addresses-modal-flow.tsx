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
import { useUpdateAddress } from '../_hooks/use-update-address';
import { useRouter } from '@/i18n/navigation';
import { useDeleteAddress } from '../_hooks/use-delete-address';

interface AddressesModalProps {
  userAddresses: Address[];
  trigger?: React.ReactNode;
}

type DialogStep = 'list' | 'form' | 'map';

export function AddressesModalFlow({
  userAddresses,
  trigger,
}: AddressesModalProps) {
  // State
  const [step, setStep] = useState<DialogStep>('list');
  const [open, setOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AddressFormSchema>>({
    username: '',
    city: '',
    street: '',
    phone: '',
    lat: '',
    long: '',
  });

  // Hooks
  const router = useRouter();
  const { isPending: isAddPending, addAddress } = useAddAddress();
  const { pendingUpdate, updateAddress } = useUpdateAddress();
  const { pendingDelete, deleteAddress } = useDeleteAddress();


  const isPending = isAddPending || pendingUpdate;

  const resetForm = () => {
    setFormData({
      username: '',
      city: '',
      street: '',
      phone: '',
      lat: '',
      long: '',
    });
    setEditingAddressId(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep('list');
      resetForm();
    }
  };

  const handleEditAddress = (address: Address) => {
    // Populate form with existing address data
    setFormData({
      username: address.username,
      city: address.city,
      street: address.street,
      phone: address.phone,
    });
    setEditingAddressId(address._id);
    setStep('form');
  };

    const handleDeleteAddress = (id: string) => {
      deleteAddress(id);
    };

  const handleFormComplete = (
    data: Omit<AddressFormSchema, 'lat' | 'long'>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    setStep('map');
  };

  const handleMapSubmit = (location: { lat: number; lng: number }) => {
    const completeData: AddressFormSchema = {
      ...formData,
      lat: location.lat.toString(),
      long: location.lng.toString(),
    } as AddressFormSchema;

    if (editingAddressId) {
      // Update existing address
      updateAddress(
        { id: editingAddressId, data: completeData },
        {
          onSuccess: () => {
            resetForm();
            router.refresh();
            setStep('list');
          },
        },
      );
    } else {
      // Add new address
      addAddress(completeData, {
        onSuccess: () => {
          resetForm();
          router.refresh();
          setStep('list');
        },
      });
    }
  };

  const getDialogContentClass = () =>
    cn(
      'h-[85vh] max-w-3xl overflow-y-scroll scrollbar-gutter-stable dark:bg-zinc-800 ',
      step !== 'list' && 'py-4',
      step === 'map' && 'overflow-hidden',
    );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Open Address Book</Button>}
      </DialogTrigger>
      <DialogContent className={cn(getDialogContentClass())}>
        <DialogHeader className="mt-2 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-2xl font-bold">
            {step === 'list' && 'My Addresses'}
            {(step === 'form' || step === 'map') &&
              (editingAddressId ? 'Update Address Info' : 'Add New Address')}

          </DialogTitle>

          {step === 'list' && (
            <Button
              onClick={() => {
                resetForm();
                setStep('form');
              }}
              className="ml-auto bg-maroon-50 text-maroon-600 hover:bg-maroon-100"
            >
              Add a New Address
            </Button>
          )}
        </DialogHeader>

        {step === 'list' && (
          <AddressSelector
            userAddresses={userAddresses}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
            pendingDelete={pendingDelete}
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
