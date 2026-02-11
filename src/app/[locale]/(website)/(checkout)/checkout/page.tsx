import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utility/tailwind-merge';
import { MoveLeft, MoveRight, Phone } from 'lucide-react';
import { useLocale } from 'next-intl';
import React from 'react';
import { useTranslations } from 'use-intl';

export default function Page() {
  // Translation
  const t = useTranslations('checkout');

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';
  return (
    <main className="flex flex-col gap-6">
      {/* Progress Section */}

      {/* Title */}
      <h1 className="text-3xl font-semibold capitalize">
        {t('shipping-address')}
      </h1>
      {/* Adresses */}
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
      {/* Added New Adress */}
      <section className="Pt-3 flex flex-col gap-3 border-b-[.0625rem] border-zinc-100 dark:border-zinc-400">
        <p
          className={cn(
            'relative flex items-center justify-center text-center text-lg uppercase tracking-wider',
            'text-zinc-500 dark:text-zinc-50',
            "before:mr-4 before:h-px before:flex-1 before:bg-zinc-100 before:content-['']",
            "after:ml-4 after:h-px after:flex-1 after:bg-zinc-100 after:content-['']",
            'before:dark:bg-zinc-400 after:dark:bg-zinc-400',
          )}
        >
          {t('or')}
        </p>

        {/* Button */}
        <Button
          variant={'secondary'}
          className="mb-9 w-full py-5 text-base font-medium dark:bg-softpink-300 dark:text-black dark:hover:bg-softpink-400"
        >
          {t('new-address')}
        </Button>
      </section>

      {/* Next Step */}
      <div className="flex justify-end">
        <Button variant="primary" className="w-[9.5rem] rounded-lg py-6">
          {arabic && <MoveLeft className="h-5 w-5" />}
          {t('next-step')}
          {!arabic && <MoveRight className="h-5 w-5" />}
        </Button>
      </div>
    </main>
  );
}
