'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useTranslations } from 'use-intl';
import CategoriesFilterList from './categories-filter-list';
import { useFilters } from '../../_hooks/use-filter';

export default function CategoryFilter() {
  // Translations
  const t = useTranslations('product.filters');

  // Hook
  const { filters, resetFilter } = useFilters({ category: null });

  return (
    <section className="w-full border-b-1 border-zinc-100 dark:border-zinc-600 lg:w-[18.875rem]">
      {/* Title & Rest Button */}

      <div className="flex w-full  items-center justify-between pt-3">
        {/* Title */}
        <h2 className="text-lg font-semibold capitalize text-zinc-800 dark:text-zinc-50">
            {t("category")}
        </h2>

        {/* Rest Button */}
        {filters.category && (
          <Button
            onClick={() => resetFilter('category')}
            className="w-fit gap-1 bg-transparent px-0 capitalize text-red-600 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:text-red-500"
          >
            <X className="text-red-600 dark:text-red-500" />
            {t('reset')}
          </Button>
        )}
      </div>

      {/* Categories */}

      <div className="mb-6">
        <CategoriesFilterList />
      </div>
    </section>
  );
}
