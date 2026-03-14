'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useFormatter } from 'next-intl';
import Spinner from '@/components/loader/Spinner';
import { useCategories } from '../_hooks/use-categories';

export default function AllCategories() {
  // Translation
  const t = useTranslations('dashboard.all-categories');
  const format = useFormatter();

  // Queries
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useCategories();

  // Ref
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLLIElement>(null);

  // Effects
  useEffect(() => {
    const root = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root,
        threshold: 0,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Variables
  const categories = data?.pages.flatMap((page) => page.categories) ?? [];

  return (
    <div className="flex h-[326px] flex-col rounded-2xl bg-background p-6 dark:border-zinc-700 dark:bg-zinc-800">
      {/* Header */}
      <h2 className="mb-3 text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
        {t('title')}
      </h2>

      {/* Scrollable content */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto pe-4">
        {isLoading ? (
          /* Loading state */
          <div className="flex h-full items-center justify-center py-10">
            <Spinner color="text-maroon-600 dark:text-softpink-300" />
          </div>
        ) : categories.length === 0 ? (
          /* Empty state */
          <p className="py-6 text-center text-sm text-zinc-400">{t('empty')}</p>
        ) : (
          /* Categories list */
          <ul>
            {categories.map((category, idx) => (
              <li key={category._id}>
                {/* Category row */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-base text-zinc-800 dark:text-zinc-200">
                    {category.name}
                  </span>
                  <span className="rounded-md bg-[#0000000D] px-3 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300">
                    {format.number(category.productsCount, 'numbers')}{' '}
                    {t('products')}
                  </span>
                </div>
                {idx < categories.length - 1 && (
                  <div className="h-px w-full bg-zinc-100 dark:bg-zinc-700" />
                )}
              </li>
            ))}

            {/* Infinite scroll sentinel */}
            <li ref={sentinelRef} className="h-1" />

            {isFetchingNextPage && (
              /* Next page loader */
              <li className="flex justify-center py-3">
                <Spinner
                  size={18}
                  color="text-maroon-600 dark:text-softpink-300"
                />
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
