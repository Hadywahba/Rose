'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../../../../components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function About() {
  // Translation
  const t = useTranslations('about');
  const locale = useLocale();
  const isRTL = locale === 'ar';


  return (
    <section className="container mx-auto w-11/12 py-10">
      <div
        className={`grid w-full items-center gap-8 md:grid-cols-2 ${
          isRTL
            ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
            : ''
        }`}
      >
        {/* Image gallery */}
        <div className="flex gap-8 rtl:flex-row-reverse">
          <div className="relative before:pointer-events-none before:absolute before:left-0 before:-z-10 before:h-[22.5rem] before:w-[16.875rem] before:rotate-3 before:rounded-[3.125rem_7.5rem_7.5rem_7.5rem] before:border-4 before:border-maroon-600 dark:before:border-softpink-400 before:content-['']">
            <Image
              src="/images/violet-gift.svg"
              alt={t('images.violet')}
              width={302}
              height={336}
              className="relative left-5 top-5 h-[21rem] w-[18.875rem] overflow-hidden rounded-[3.125rem_7.5rem_7.5rem_7.5rem] object-cover"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              src="/images/orange-gift.svg"
              alt={t('images.orange')}
              width={192}
              height={192}
              className="h-48 w-48 rounded-[9.375rem] object-cover"
            />
            <Image
              src="/images/blue-gift.svg"
              alt={t('images.blue')}
              width={192}
              height={144}
              className="h-36 w-48 rounded-[3.125rem_6.25rem_6.25rem_3.125rem] object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h2 className="mb-6 text-xl font-bold text-softpink-500 dark:text-maroon-400">{t('title')}</h2>

          <h3 className="mb-1 text-3xl font-bold text-maroon-700 dark:text-softpink-200">
            {t.rich('heading', {
              span: (chunks) => (
                <span className="text-softpink-500 dark:text-maroon-400">{chunks}</span>
              ),
            })}
          </h3>

          <p>{t('description')}</p>

          <Button
            asChild
            className="my-6 w-32 rounded-xl bg-maroon-600 uppercase hover:bg-maroon-700 dark:bg-softpink-200 dark:hover:bg-softpink-300"
          >
            <Link href="/products">
              {t('discover')}
              {locale === 'en' ? (
                <ArrowRight aria-hidden />
              ) : (
                <ArrowLeft aria-hidden />
              )}
            </Link>
          </Button>

          <ul
            aria-label={t('featuresLabel')}
            className="grid grid-cols-2 gap-4"
          >
            {t.raw('services').map((service: string) => (
              <li key={service} className="flex gap-4">
                <Check aria-hidden="true" className="text-maroon-700 dark:text-softpink-400" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
