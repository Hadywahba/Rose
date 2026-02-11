import { RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, PencilLine, Phone, Trash2 } from 'lucide-react';
import { Address } from './my-addresses';

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
        <RadioGroupItem value={address.id} className="sr-only mt-1" />

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <MapPin size={20} />
            </div>
            {/* title */}
            <h4 className="text-xl font-semibold">{address.title}</h4>
          </div>

          {/* fullAddress */}
          <p className="text-sm text-zinc-800">{address.fullAddress}</p>
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

            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
              aria-label="Delete address"
            >
              <Trash2 size={18} className="text-white" />
            </button>
          </div>
        </div>
      </label>
    </>
  );
}
