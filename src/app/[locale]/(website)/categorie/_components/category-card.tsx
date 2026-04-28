'use client';

import Image from 'next/image';
import { Category } from '@/lib/types/category/category';
import { useTranslations } from 'next-intl';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';

type CategoryCardProps = {
  category: Category;
  onClick: (category: Category) => void;
  isSelected?: boolean;
};

export default function CategoryCard({
  category,
  onClick,
  isSelected,
}: CategoryCardProps) {
  // Ttanslation
  const t = useTranslations('category');

  // Variabeles
  const imageUrl = category?.image?.startsWith('http')
    ? category?.image
    : `https://rose-app.elevateegy.com/uploads/${category?.image}`;

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        isSelected
          ? 'border-maroon-500 ring-2 ring-maroon-400 dark:border-softpink-400 dark:ring-softpink-400/50'
          : 'border-zinc-200 hover:border-maroon-300 dark:border-zinc-700 dark:hover:border-maroon-700',
        'dark:bg-zinc-900',
      )}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-maroon-50 dark:bg-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={category.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LayoutGrid className="h-12 w-12 text-maroon-200 dark:text-maroon-800" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Products count badge */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-maroon-700 shadow-sm backdrop-blur-sm dark:bg-zinc-900/90 dark:text-softpink-300">
          {category._count.products} {t('card.products')}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-base font-bold capitalize text-zinc-800 dark:text-zinc-50">
            {category.title}
          </h3>
          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-maroon-600 dark:text-zinc-500 dark:group-hover:text-softpink-400" />
        </div>

        {category.description && (
          <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
            {category.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <span className="text-xs font-semibold text-maroon-600 dark:text-softpink-400">
            {t('card.viewSubcategories')} →
          </span>
        </div>
      </div>
    </button>
  );
}
