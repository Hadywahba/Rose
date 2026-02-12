import { ConfirmDelete } from '@/components/shared/confirm-delete';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Address } from '@/lib/types/user-addresses';
import { MapPin, PencilLine, Phone } from 'lucide-react';

type AddressCardProps = {
  address: Address;
  selected: boolean;
};

export default function AddressCard({ address, selected }: AddressCardProps) {
  return (
    <>
      <label
        className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all ${
          selected
            ? 'border-maroon-600 bg-maroon-50'
            : 'border-zinc-300 hover:border-maroon-300'
        }`}
      >
        <RadioGroupItem value={address._id} className="sr-only mt-1" />

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <MapPin size={20} />
            </div>
            {/* title */}
            <h4 className="text-xl font-semibold">{address.city}</h4>
          </div>

          {/* fullAddress */}
          <p className="text-sm text-zinc-800">{address.street}</p>
        </div>

        <div className="flex flex-shrink-0 items-start gap-2">
          {/* phone */}
          <div className="flex items-center gap-2 text-zinc-600">
            <Phone size={20} />
            <span className="text-sm">{address.phone}</span>
          </div>

          {/* edit & delete */}
          <div className="flex flex-col gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-400 transition-colors hover:bg-zinc-200"
              aria-label="Edit address"
            >
              <PencilLine size={18} className="text-zinc-600" />
            </button>

            <ConfirmDelete/>
          </div>
        </div>
      </label>
    </>
  );
}
