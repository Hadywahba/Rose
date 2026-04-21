import { Address } from '@/lib/types/address/address';
import { cn } from '@/lib/utility/tailwind-merge';
import { MapPin } from 'lucide-react';
import React from 'react';

type HeaderlocationProps = {
  isborder: boolean;
  address: Address[];
};

export default function Headerlocation({
  isborder,
  address,
}: HeaderlocationProps) {
  const lastAddress = address?.[0];

  return (
    <>
      {lastAddress ? (
        <div
          className={cn(
            'flex flex-col pl-6 text-sm',
            isborder ? 'border-l border-gray-200' : '',
          )}
        >
          <span className="font-normal text-zinc-500">Deliver to:</span>

          <div className="flex items-center gap-1 font-semibold text-red-800 dark:text-softpink-200">
            <MapPin className="h-4 w-4" />
            <span>{lastAddress.city}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
