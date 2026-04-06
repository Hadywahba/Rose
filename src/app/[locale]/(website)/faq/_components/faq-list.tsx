'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import { Input } from '@/components/ui/input';

type FaqItem = {
  question: string;
  answer: string;
};

export default function FAQList() {
  // Translation
  const t = useTranslations('faq');

  // State
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  // Variables
  const items: FaqItem[] = Array.from({ length: 6 }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  const filtered = items.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:px-20">
      {/* Search */}
      <div className="relative mx-auto mb-10 md:max-w-3xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search-placeholder')}
          className="h-12 w-full rounded-xl border-zinc-200 bg-white/90 pl-10 text-sm shadow-sm focus-visible:ring-maroon-400 dark:border-zinc-700 dark:bg-zinc-900/80"
        />
      </div>

      <div className="mx-auto mb-6 flex max-w-3xl flex-wrap gap-2">
        <span className="rounded-full bg-maroon-600 px-3 py-1 text-xs font-semibold text-white">
          FAQ
        </span>
        <span className="rounded-full border border-maroon-200 bg-maroon-50 px-3 py-1 text-xs font-medium text-maroon-700 dark:border-maroon-700 dark:bg-zinc-800 dark:text-softpink-200">
          Quick answers
        </span>
        <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          Support
        </span>
      </div>

      {/* Items */}
      <div className="mx-auto max-w-3xl space-y-3">
        {filtered.length === 0 && (
          <p className="py-10 text-center text-zinc-400">{t('no-results')}</p>
        )}

        {filtered.map((item, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/90 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/80"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors',
                openIndex === index
                  ? 'bg-gradient-to-r from-maroon-50 to-softpink-50 dark:from-zinc-800 dark:to-zinc-800'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-800',
              )}
            >
              <span className="flex items-start gap-3 text-sm font-semibold text-zinc-800 dark:text-zinc-100 sm:text-base">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon-100 text-xs font-bold text-maroon-700 dark:bg-maroon-900/40 dark:text-softpink-200">
                  {index + 1}
                </span>
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-maroon-600 transition-transform duration-300 dark:text-softpink-300',
                  openIndex === index && 'rotate-180',
                )}
              />
            </button>

            <div
              className={cn(
                'grid transition-all duration-300',
                openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="border-t border-zinc-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 sm:text-base">
                  {item.answer}
                </p>
                {openIndex === index && (
                  <div className="flex items-center gap-2 px-5 pb-4">
                    <button
                      type="button"
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-maroon-300 hover:text-maroon-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-maroon-700 dark:hover:text-softpink-200"
                    >
                      Helpful
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-maroon-300 hover:text-maroon-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-maroon-700 dark:hover:text-softpink-200"
                    >
                      Need more
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
