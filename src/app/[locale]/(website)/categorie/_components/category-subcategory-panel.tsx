'use client';

import { Category } from '@/lib/types/category/category';
import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';

type CategorySubcategoryPanelProps = {
  category: Category;
  onClose: () => void;
};

export default function CategorySubcategoryPanel({
  category,
  onClose,
}: CategorySubcategoryPanelProps) {
  // Translations
  const t = useTranslations('category');

  return (
    <div className="overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm dark:border-maroon-900/50 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-maroon-700 to-maroon-500 px-5 py-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-white/80" />
          <h3 className="font-bold text-white">
            {t('subcategory.title')}: {category.title}
          </h3>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white">
            {category.subCategories?.length ?? 0}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
        >
          ✕
        </button>
      </div>

      {/* Subcategories */}
      <div className="p-5">
        {!category.subCategories?.length ? (
          <p className="py-4 text-center text-sm text-zinc-400 dark:text-zinc-500">
            {t('subcategory.empty')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {category.subCategories.map((sub) => (
              <span
                key={sub.id}
                className="cursor-pointer rounded-full border border-maroon-200 bg-maroon-50 px-4 py-1.5 text-sm font-semibold text-maroon-700 transition-colors hover:bg-maroon-600 hover:text-white dark:border-maroon-800 dark:bg-maroon-900/30 dark:text-softpink-300 dark:hover:bg-maroon-700 dark:hover:text-white"
              >
                {sub.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
