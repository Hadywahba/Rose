'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utility/tailwind-merge';
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import CheckoutModal from './checkout-modal';

export default function AddressButton() {
  // Translation
  const t = useTranslations('checkout');

  // State
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';

  // Function
  const openLocationModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <section className="Pt-3 flex flex-col gap-3 border-b-[.0625rem] border-zinc-100 dark:border-zinc-400 ">
        <p
          className={cn(
            'relative flex items-center justify-center text-center text-lg uppercase tracking-wider',
            'text-zinc-500 dark:text-zinc-50',

            `before:h-px before:flex-1 before:bg-zinc-100 before:content-['']`,
            arabic ? 'before:ml-4' : 'before:mr-4',

            `after:h-px after:flex-1 after:bg-zinc-100 after:content-['']`,
            arabic ? 'after:mr-4' : 'after:ml-4',

            'before:dark:bg-zinc-400 after:dark:bg-zinc-400',
          )}
        >
          {t('or')}
        </p>

        {/* Button */}
        <Button
          onClick={openLocationModal}
          variant={'secondary'}
          className="mb-9 w-full rounded-xl py-6 text-base font-medium dark:bg-softpink-300 dark:text-black dark:hover:bg-softpink-400"
        >
          {t('new-address')}
        </Button>
      </section>
      {openModal && <CheckoutModal setOpenModal={setOpenModal} openModal={openModal} />}
    </>
  );
}
