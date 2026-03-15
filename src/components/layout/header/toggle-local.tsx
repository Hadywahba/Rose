'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';

import { useLocale } from 'next-intl';
import React from 'react';

export default function ToggleLocal() {
  // Translation
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  const toggleLocale = () => {
    router.push(`${pathname}${location.search}`, {
      locale: locale === 'ar' ? 'en' : 'ar',
    });
  };

  return (
    <Button
      variant={'carousel'}
      onClick={toggleLocale}
      className="text-sm font-medium hover:text-red-800 w-10"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}
