// 'use client';

// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Address } from '@/lib/types/user-addresses';
// import AddressForm from './add-address-form';
// import AddressSelector from './address-selector';
// import { cn } from '@/lib/utility/tailwind-merge';

// interface AddressesModalProps {
//   userAddresses: Address[];
//   selectedAddressId?: string;
//   onSelectAddress?: (id: string) => void;
//   trigger?: React.ReactNode;
// }

// export function AddressesModal({
//   userAddresses,
//   selectedAddressId,
//   onSelectAddress,
//   trigger,
// }: AddressesModalProps) {
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleOpenChange = (isOpen: boolean) => {
//     setOpen(isOpen);
//     if (!isOpen) {
//       setShowAddressForm(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         {trigger || <Button variant="outline">Open Address Book</Button>}
//       </DialogTrigger>
//       <DialogContent
//         className={cn(
//           'max-h-[85vh] max-w-3xl overflow-y-auto',
//           showAddressForm && 'max-h-[85vh] max-w-3xl overflow-hidden py-5',
//         )}
//       >
//         <DialogHeader className="mt-2 flex flex-row items-center justify-between space-y-0 pb-4">
//           <DialogTitle className="text-2xl font-bold">My Addresses</DialogTitle>
//           <Button
//             onClick={() => setShowAddressForm(true)}
//             className="ml-auto bg-maroon-50 text-maroon-600 hover:bg-maroon-100"
//           >
//             Add a New Address
//           </Button>
//         </DialogHeader>

//         {showAddressForm ? (
//           <AddressForm onBack={() => setShowAddressForm(false)} />
//         ) : (
//           <AddressSelector
//             userAddresses={userAddresses}
//             selectedAddressId={selectedAddressId}
//             onSelectAddress={onSelectAddress}
//           />
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
