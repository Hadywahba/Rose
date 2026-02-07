'use client';

import { companiesList } from '@/lib/constants/companies-list';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Companies() {
  const t = useTranslations('companies');
  const locale = useLocale();

  const formattedCount = new Intl.NumberFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    { maximumFractionDigits: 1 }
  ).format(4.5);

  return (
    <section className="container mx-auto w-11/12 py-10">
      <div className="flex min-h-52 flex-col justify-center gap-6 rounded-3xl bg-maroon-50 dark:bg-zinc-700">
        <p className="py-3 text-center text-4xl font-bold text-maroon-700 dark:text-softpink-200">
          {t.rich('trustedBy', {
            span: () => (
              <span className="text-softpink-500 dark:text-maroon-400">
                {formattedCount}
                {locale === 'ar' ? ' ألف+' : 'K+'}
              </span>
            ),
          })}
        </p>

        <div className="flex justify-center gap-16 pb-8">
          {companiesList.map((company, index) => (
            <div key={index} className="relative h-14 w-36">
              <Image
                src={company.src}
                alt={t(company.alt)}
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
