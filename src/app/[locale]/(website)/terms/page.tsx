import { Link } from '@/i18n/navigation';
import { Sections } from '@/lib/constants/terms.constant';
import { FileCheck2, Scale } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  // Translation
  const t = useTranslations('terms');

  return (
    <main className="overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <section className="border-b border-maroon-100 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-12 lg:px-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-maroon-200 bg-maroon-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-maroon-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-softpink-200">
            <Scale className="h-3.5 w-3.5" />
            {t('badge')}
          </p>
          <h1 className="text-3xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 lg:grid-cols-[1fr_280px] lg:px-16">
          {/* Sections */}
          <div className="rounded-2xl border border-maroon-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="space-y-5">
              {Sections.map((key, index) => (
                <article
                  key={index}
                  className="border-b border-zinc-100 pb-4 last:border-b-0 dark:border-zinc-800"
                >
                  <h2 className="text-base font-semibold text-maroon-700 dark:text-softpink-200">
                    {t(`sections.${key.text}.title`)}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(`sections.${key.text}.text`)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Aside */}
          <aside className="h-fit rounded-2xl border border-maroon-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-600">
              <FileCheck2 className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {t('note')}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/contact"
                className="rounded-full bg-maroon-600 px-4 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-maroon-700"
              >
                {t('contact')}
              </Link>
              <Link
                href="/privacy"
                className="rounded-full border border-maroon-300 px-4 py-2 text-center text-xs font-semibold text-maroon-700 transition-colors hover:bg-maroon-50 dark:border-zinc-600 dark:text-softpink-200 dark:hover:bg-zinc-800"
              >
                {t('privacy')}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
