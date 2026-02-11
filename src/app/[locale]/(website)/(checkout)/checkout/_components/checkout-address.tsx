'use client';
import { Phone } from 'lucide-react';
import React from 'react';
import { useAddress } from '../_hooks/use-checkout';

export default function CheckoutAddress() {
    const {addresses}=useAddress()
    console.log(addresses)
  return (
    <section className="flex max-h-[19.75rem] flex-col gap-3">
      <div className="flex w-full flex-col gap-1 rounded-2xl border-[.0625rem] border-zinc-300 px-4">
        <div className="mt-4 flex items-center justify-between">
          {/* Location */}
          <h2 className="text-2xl font-semibold capitalize">giza</h2>
          {/* Phone */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-maroon-600">
              <Phone className="size-5 text-white" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-50">+201012346578</p>
          </div>
        </div>
        {/* Address */}
        <p className="mb-4 w-fit rounded-full bg-zinc-100 px-3 dark:bg-zinc-600">
          21 Ahmed Mohamed St., King Faisal St., Giza
        </p>
      </div>
    </section>
  );
}
