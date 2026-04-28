'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

type BookPaginationNavProps = {
  currentPage: number;
  totalPages: number;
  onGoTo: (page: number, dir: 'next' | 'prev') => void;
};

export default function BookPaginationNav({
  currentPage,
  totalPages,
  onGoTo,
}: BookPaginationNavProps) {
   // Translations
  const t = useTranslations('category');

  return (
    <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
      {/* Prev */}
      <button
        onClick={() => onGoTo(currentPage - 1, 'prev')}
        disabled={currentPage === 0}
        className={cn(
          'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
          currentPage === 0
            ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700'
            : 'text-maroon-600 hover:bg-maroon-50 dark:text-softpink-400 dark:hover:bg-maroon-900/30',
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        {t('prev')}
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i, i > currentPage ? 'next' : 'prev')}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-colors',
              i === currentPage
                ? 'bg-maroon-600 text-white dark:bg-softpink-400 dark:text-zinc-900'
                : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onGoTo(currentPage + 1, 'next')}
        disabled={currentPage === totalPages - 1}
        className={cn(
          'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
          currentPage === totalPages - 1
            ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700'
            : 'text-maroon-600 hover:bg-maroon-50 dark:text-softpink-400 dark:hover:bg-maroon-900/30',
        )}
      >
        {t('next')}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
