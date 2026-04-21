'use client';

import { Phone } from 'lucide-react';
import React, { useContext } from 'react';
import ListError from '@/components/error/list-error';
import { useLocale } from 'next-intl';
import { formatPhoneNumberToArabic } from '@/lib/utility/convert-numbers';
import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { cn } from '@/lib/utility/tailwind-merge';
import { Address } from '@/lib/types/address/address';

interface CheckoutAddressProps {
  displayAddress: Address[];
  addressError: Error | null;
}
export default function CheckoutAddress({
  displayAddress,
  addressError,
}: CheckoutAddressProps) {
  // Translation
  const locale = useLocale();

  // Context
  const { setAddress, address } = useContext(CheckoutContext)!;

  return (
    <ListError errors={addressError}>
      <section
        id="address-scrollable"
        className="flex max-h-[20.6rem] flex-col gap-3 overflow-y-auto transition-all duration-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-200/80 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600/80 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
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
        {displayAddress.map((add) => (
          <div
            onClick={() => {
              setAddress(add);
            }}
            key={add.id}
            className={cn(
              'mb-3 flex w-full cursor-pointer flex-col rounded-2xl border-[.0625rem] border-zinc-300 px-4',
              address?._id === add.id
                ? 'bg-maroon-600 dark:bg-softpink-500'
                : 'group hover:bg-maroon-300 dark:bg-zinc-50 dark:hover:bg-zinc-400',
            )}
          >
            <div className="mt-4 flex items-center justify-between">
              {/* Location */}
              <h2
                className={cn(
                  'text-2xl font-semibold capitalize',
                  address?._id === add.id
                    ? 'text-zinc-50'
                    : 'dark:text-zinc-800',
                )}
              >
                {add.city}
              </h2>

              {/* Phone */}
              <div className="flex items-center justify-between gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon-600',
                    address?._id === add.id ? 'bg-zinc-50' : 'bg-maroon-600',
                  )}
                >
                  <Phone
                    className={cn(
                      'h-5 w-5',
                      address?._id === add.id
                        ? 'text-maroon-600'
                        : 'text-white',
                    )}
                  />
                </div>
                <p
                  className={cn(
                    'text-lg text-zinc-500 dark:text-zinc-50',

                    address?._id === add.id
                      ? 'text-zinc-50'
                      : 'group-hover:text-white dark:text-zinc-800 dark:group-hover:text-zinc-900',
                  )}
                >
                  {formatPhoneNumberToArabic(add.phone, locale)}
                </p>
              </div>
            </div>

            {/* Address */}
            <p
              className={cn(
                'mb-4 w-fit rounded-full px-3 font-medium',
                address?._id === add.id
                  ? 'bg-zinc-800 text-zinc-50'
                  : 'bg-zinc-100 dark:bg-zinc-600',
              )}
            >
              {add.street}
            </p>
          </div>
        ))}
      </section>
    </ListError>
  );
}
