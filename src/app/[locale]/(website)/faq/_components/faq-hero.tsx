import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';

export default function FAQHero() {
   // Translation
  const t = useTranslations('faq');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-maroon-50 via-white to-softpink-100 py-16 dark:from-zinc-900 dark:via-maroon-700 dark:to-zinc-900 sm:py-24">
      {/* Decorative blobs */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-maroon-100 opacity-40 blur-3xl dark:bg-maroon-900" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-softpink-100 opacity-40 blur-3xl dark:bg-softpink-900" />

      <div className="container relative mx-auto px-4 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-maroon-600 shadow-lg shadow-maroon-200 dark:shadow-maroon-900 sm:h-20 sm:w-20">
          <HelpCircle className="h-8 w-8 text-white sm:h-10 sm:w-10" />
        </div>

        <h1 className="mb-4 text-3xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-4xl lg:text-5xl">
          {t('heading')}
        </h1>
        <p className="mx-auto max-w-xl text-base text-zinc-500 dark:text-zinc-400 sm:text-lg">
          {t('paragraph')}
        </p>
      </div>
    </section>
  );
}
