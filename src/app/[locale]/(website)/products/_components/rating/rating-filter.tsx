'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { useFilters } from '../../_hooks/use-filter';
import RatingFilterList from './rating-filter-list';

export default function RatingFilter() {
  // Translations
  const t = useTranslations('product.filters');

  // Hook
  const { filters, resetFilter } = useFilters({ minRating: null });

  return (
    <section className="w-full lg:w-[18.875rem]">
      {/* Title & Rest Button */}

      <div className="flex w-full items-center justify-between pt-3">
        {/* Title */}
        <h2 className="text-lg font-semibold capitalize text-zinc-800 dark:text-zinc-50">
          {t('rating')}
        </h2>

        {/* Rest Button */}
        {filters.minRating && (
          <Button
            onClick={() => resetFilter('minRating')}
            className="w-fit gap-1 bg-transparent px-0 capitalize text-red-600 hover:bg-transparent dark:bg-transparent dark:text-red-500 dark:hover:bg-transparent"
          >
            <X className="text-red-600 dark:text-red-500" />
            {t('reset')}
          </Button>
        )}
      </div>

      {/* Ratring */}

      <div className="mb-6 mt-2">
        <RatingFilterList />
      </div>
    </section>
  );
}
