'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  // translation
  const t = useTranslations('not-found');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  px-4 ">
     <Image
        src="/assets/images/not-found.png"
        alt="Error"
        width={600}
        height={428}
        className="mb-4 animate-pulse"
      />
      <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </h2>
      <p className="mt-2  text-center text-gray-600 dark:text-gray-400">
        {t('description')}
      </p>
    </div>
  );
}
