'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function ToggleLocale() {
  // Translation
  const locale = useLocale(); // Navigation
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
      className="text-zinc-800 rounded-md bg-white px-3 py-2 text-sm font-medium "
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
