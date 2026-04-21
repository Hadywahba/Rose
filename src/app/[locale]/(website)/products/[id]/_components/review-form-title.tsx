import { useTranslations } from 'next-intl';
import React from 'react';

export default function ReviewFormTitle() {
  // Translations
  const t = useTranslations('review-form');
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center font-semibold text-zinc-800 dark:text-zinc-50">
      {t('login-to-review')}
    </div>
  );
}
