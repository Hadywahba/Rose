import { ConfirmDelete } from '@/components/shared/confirm-delete';
import { Address } from '@/lib/types/user-addresses';
import { MapPin, PencilLine, Phone } from 'lucide-react';

type AddressCardProps = {
  address: Address;
  handleDeleteAddress: (id: string) => void;
  onEditAddress: (address: Address) => void; 
  pendingDelete: boolean;
};

export default function AddressCard({
  address,
  handleDeleteAddress,
  onEditAddress, 
  pendingDelete,
}: AddressCardProps) {
  return (
    <div className="relative flex items-start gap-4 rounded-lg border-2 border-zinc-300 p-4 transition-all hover:border-maroon-600 dark:hover:border-softpink-600">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <MapPin size={20} />
          </div>
          <h4 className="text-xl font-semibold">{address.city}</h4>
        </div>

        <p className="text-sm text-zinc-800 dark:text-zinc-100">
          {address.street}
        </p>
      </div>

      <div className="absolute -right-4 bottom-2 flex flex-shrink-0 items-start gap-2">
        <div className="flex items-center gap-2 py-2 text-zinc-600">
          <Phone size={20} className="dark:text-zinc-100" />
          <span className="text-sm dark:text-zinc-100">{address.phone}</span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            aria-label="Edit address"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-400 bg-zinc-50 transition-colors hover:bg-zinc-200"
            type="button"
            onClick={() => onEditAddress(address)}
          >
            <PencilLine size={18} className="text-zinc-600" />
          </button>

          <ConfirmDelete
            id={address._id}
            handleDeleteAddress={handleDeleteAddress}
            pendingDelete={pendingDelete}
          />
        </div>
      </div>
    </div>
  );
}