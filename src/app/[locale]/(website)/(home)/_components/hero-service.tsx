'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import { LucideIcon } from 'lucide-react';
import { useLocale } from 'next-intl';

import React from 'react';
import { useFormatter, useTranslations } from 'use-intl';

export default function HeroService({
  Icon,
  text,
  title,
}: {
  Icon: LucideIcon;
  text: string;
  title: string;
}) {
  // Translation
  const t = useTranslations('hero');

  // Router
  const locale = useLocale();
  const format = useFormatter();

  // Variables
  const price =
    locale === 'ar'
      ? format.number(120, 'currency-no-decimals')
      : format
          .number(120, 'currency-no-decimals')
          .replace(/^(\D+)?(\d+)/, '$2\u00A0$1');

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 sm:mx-0 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-4">
      {/* Image Part */}
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-maroon-600 dark:bg-softpink-200">
        {/* Icon */}
        <Icon className="block size-10 text-white dark:text-black" />
      </div>

      {/* Title Part */}
      <div className="flex flex-col items-center justify-center gap-1 lg:items-start">
        <p
          className={cn(
            'font-semibold capitalize text-maroon-600 dark:text-softpink-200',
            locale === 'ar'
              ? 'text-base md:text-base lg:text-lg 2xl:text-xl'
              : 'text-lg sm:text-xl',
          )}
        >
          {t(title)}
        </p>

        <span className="text-center text-sm font-normal text-[#71717a] dark:text-zinc-300 md:text-start">
          {t(text, {
            price,
            number: format.number(30, 'numbers'),
            percentage: format.number(1, 'percentage-base'),
          })}
        </span>
      </div>
    </div>
  );
}
