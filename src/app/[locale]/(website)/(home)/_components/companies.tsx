'use client';

import { companiesList } from '@/lib/constants/companies-list';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Companies() {
  const t = useTranslations('companies');
  const locale = useLocale();

  const formattedCount = new Intl.NumberFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    { maximumFractionDigits: 1 },
  ).format(4.5);

  return (
    <section className="container mx-auto w-11/12 py-10">
      <div className="flex min-h-52 flex-col justify-center gap-4 rounded-3xl bg-maroon-50 p-4 dark:bg-zinc-700 sm:gap-6 sm:p-6">
        <p className="py-3 text-center text-xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-2xl md:text-3xl lg:text-4xl">
          {t.rich('trustedBy', {
            span: () => (
              <span className="text-softpink-500 dark:text-maroon-400">
                {formattedCount}
                {locale === 'ar' ? ' ألف+' : 'K+'}
              </span>
            ),
          })}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pb-4 sm:gap-8 sm:pb-8 md:gap-12 lg:gap-16">
          {companiesList.map((company, index) => (
            <div
              key={index}
              className="bg- relative h-10 w-24 sm:h-12 sm:w-28 md:h-14 md:w-36"
            >
              <Image
                src={company.src}
                alt={company.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
