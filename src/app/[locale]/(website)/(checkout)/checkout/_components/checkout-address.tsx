'use client';

import { Phone } from 'lucide-react';
import React from 'react';
import { useAddress } from '../_hooks/use-checkout';
import ListError from '@/components/error/list-error';
import { useLocale } from 'next-intl';
import AddressSkeleton from '@/components/skeletons/address/address-skeleton';
import { formatPhoneNumberToArabic } from '@/lib/utility/convert-numbers';

const ADDRESSES_PER_PAGE = 3;
export default function CheckoutAddress() {
  const { addresses, error, isLoading } = useAddress();

  // Hook
  const locale = useLocale();

  return (
    <ListError errors={error}>
      <section
        id="address-scrollable"
        className="flex max-h-[20.50.2rem] flex-col gap-3 overflow-y-auto transition-all duration-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-200/80 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600/80 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
        onMouseEnter={(e) => {
          const isDark = document.documentElement.classList.contains('dark');
          e.currentTarget.style.scrollbarColor = isDark
            ? 'rgba(75, 85, 99, 0.8) transparent'
            : 'rgba(156, 163, 175, 0.4) transparent';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.scrollbarColor = 'transparent transparent';
        }}
      >
        {isLoading ? (
          <div className="mb-3 flex w-full flex-col rounded-2xl px-4">
            {Array.from({ length: ADDRESSES_PER_PAGE }).map((_, index) => (
              <AddressSkeleton key={index} />
            ))}
          </div>
        ) : (
          addresses?.addresses.map((address) => (
            <div
              key={address._id}
              className="mb-3 flex w-full flex-col rounded-2xl border-[.0625rem] border-zinc-300 px-4"
            >
              <div className="mt-4 flex items-center justify-between">
                {/* Location */}
                <h2 className="text-2xl font-semibold capitalize">
                  {address.city}
                </h2>

                {/* Phone */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-600">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-50">
                    {formatPhoneNumberToArabic(address.phone, locale)}
                  </p>
                </div>
              </div>

              {/* Address */}
              <p className="mb-4 w-fit rounded-full bg-zinc-100 px-3 dark:bg-zinc-600">
                {address.street}
              </p>
            </div>
          ))
        )}
      </section>
    </ListError>
  );
}
