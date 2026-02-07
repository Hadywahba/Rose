'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function NotFound() {
  const t = useTranslations('not-found');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  px-4 ">
      <h1 className="text-9xl font-extrabold text-maroon-600 dark:text-softpink-600">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </h2>
      <p className="mt-2 max-w-md text-center text-gray-600 dark:text-gray-400">
        {t('description')}
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-maroon-600 dark:bg-softpink-600 px-6 py-3 text-white shadow dark:text-zinc-50 transition hover:bg-maroon-700 dark:hover:bg-softpink-500"
      >
        {t('button')}
      </Link>
    </div>
  );
}
