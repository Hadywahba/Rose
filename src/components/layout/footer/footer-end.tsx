import { useTranslations } from 'next-intl';
import React from 'react';

export default function FooterEnd() {
    // Translation
  const t = useTranslations('');
  return (
    <section className="mx-auto mt-10 max-w-7xl border-t border-maroon-100/80 pt-5 text-center text-lg text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
    {t('footer-end')}
    </section>
  );
}
