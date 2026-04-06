import { Link } from '@/i18n/navigation';
import { Cards, Icons } from '@/lib/constants/privacy.constant';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  // Translations
  const t = useTranslations('privacy');

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-softpink-500 via-maroon-600 to-maroon-700 py-20 sm:py-24">
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-softpink-100/20 blur-3xl" />

        <div className="container relative mx-auto px-4 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/95">
            <Sparkles className="h-3.5 w-3.5" />
            {t('badge')}
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-maroon-100 sm:text-base">
            {t('subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {t.raw('chips').map((chip: string) => (
              <span
                key={chip}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-12 dark:bg-zinc-950 sm:py-16">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Cards.map((key, index) => {
              const Icon = Icons[index].Icons;
              return (
                <article
                  key={index}
                  className="to-softpink-50/40 group relative overflow-hidden rounded-2xl border border-maroon-100 bg-gradient-to-br from-white via-maroon-50/40 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-600">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-maroon-700 dark:text-softpink-200">
                    {t(`cards.${key.text}.title`)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(`cards.${key.text}.text`)}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-maroon-600 to-softpink-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <section className="mt-8 rounded-2xl border border-maroon-100 bg-gradient-to-r from-maroon-50 to-softpink-50 p-5 dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-900">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-full bg-maroon-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-maroon-700"
              >
                {t('cta1')}
              </Link>
              <Link
                href="/terms"
                className="rounded-full border border-maroon-300 px-4 py-2 text-xs font-semibold text-maroon-700 transition-colors hover:bg-maroon-100 dark:border-zinc-600 dark:text-softpink-200 dark:hover:bg-zinc-800"
              >
                {t('cta2')}
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
