'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';

type BookPaginationDotsProps = {
  currentPage: number;
  totalPages: number;
  onGoTo: (page: number, dir: 'next' | 'prev') => void;
};

export default function BookPaginationDots({
  currentPage,
  totalPages,
  onGoTo,
}: BookPaginationDotsProps) {
  // Translations
  const t = useTranslations('category');

  return (
    <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-3 dark:border-zinc-800">
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {t('page')} {currentPage + 1} / {totalPages}
      </span>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i, i > currentPage ? 'next' : 'prev')}
            aria-label={`${t('page')} ${i + 1}`}
            className={cn(
              'rounded-full transition-all duration-300',
              i === currentPage
                ? 'h-2.5 w-6 bg-maroon-600 dark:bg-softpink-400'
                : 'h-2.5 w-2.5 bg-zinc-200 hover:bg-maroon-300 dark:bg-zinc-700 dark:hover:bg-maroon-700',
            )}
          />
        ))}
      </div>
    </div>
  );
}
