import { Gift, Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { footerItems } from '@/lib/constants/public-footer';

export default function FooterLowerBody() {
  // Translation
  const t = useTranslations('homepage');

  const quickLinks = footerItems.filter((item) =>
    [
      'footer.home',
      'footer.products',
      'footer.occasions',
      'footer.categories',
    ].includes(item.name),
  );
  const companyLinks = footerItems.filter((item) =>
    ['footer.about', 'footer.contact', 'footer.faqs'].includes(item.name),
  );
  const policyLinks = footerItems.filter((item) =>
    ['footer.terms', 'footer.privacy'].includes(item.name),
  );

  return (
    <>
      <div className="mx-auto space-y-4 sm:mx-0">
        <div className="relative mx-auto h-16 w-36 sm:mx-0">
          <Image
            src="/images/logo.png"
            alt="Rose Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Thoughtful gifting for birthdays, anniversaries, and every special
          moment.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-maroon-200 bg-maroon-50 px-3 py-1 text-xs font-medium text-maroon-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-softpink-200">
          <Heart className="h-3.5 w-3.5" />
          Crafted with care
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-maroon-700 dark:text-softpink-300">
          Explore
        </h4>
        <ul className="space-y-2.5">
          {quickLinks.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="inline-flex text-sm text-zinc-600 transition-colors hover:text-maroon-700 dark:text-zinc-400 dark:hover:text-softpink-200"
              >
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-maroon-700 dark:text-softpink-300">
          Company
        </h4>
        <ul className="space-y-2.5">
          {companyLinks.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="inline-flex text-sm text-zinc-600 transition-colors hover:text-maroon-700 dark:text-zinc-400 dark:hover:text-softpink-200"
              >
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-maroon-200/80 bg-gradient-to-br from-maroon-50 to-softpink-50 p-5 dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-900">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-600">
          <Gift className="h-5 w-5 text-white" />
        </div>
        <h4 className="text-base font-semibold text-maroon-700 dark:text-softpink-200">
          {t('footer.faqs')}
        </h4>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Find quick help, policies, and support links in one place.
        </p>
        <ul className="mt-4 space-y-2">
          {policyLinks.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="text-sm text-zinc-600 transition-colors hover:text-maroon-700 dark:text-zinc-400 dark:hover:text-softpink-200"
              >
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
