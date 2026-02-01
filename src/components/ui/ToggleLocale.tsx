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
      className="text-white rounded-md bg-blue-500 px-3 py-2 text-sm font-medium hover:bg-blue-600"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
