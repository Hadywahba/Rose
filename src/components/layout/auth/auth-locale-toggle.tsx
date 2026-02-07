'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function AuthLocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    router.push(`${pathname}${location.search}`, {
      locale: locale === 'ar' ? 'en' : 'ar',
    });
  }

  return (
    <button
      onClick={toggleLocale}
      className="text-base font-mediumw-full text-end text-zinc-700 font-zain transition-colors duration-300 hover:text-maroon-700 dark:text-zinc-50 dark:hover:text-maroon-300"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
