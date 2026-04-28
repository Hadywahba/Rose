'use client';

import ListError from '@/components/error/list-error';
import { Category } from '@/lib/types/category/category';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import CategoryCard from './category-card';
import BookPaginationDots from './book-pagination-dots';
import BookPaginationNav from './book-pagination-nav';
import CategorySubcategoryPanel from './category-subcategory-panel';

const ITEMS_PER_PAGE = 4;

type CategoriesListClientProps = {
  categories: Category[];
  error: Error | null;
};

export default function CategoriesListClient({
  categories,
  error,
}: CategoriesListClientProps) {
  // Translations
  const t = useTranslations('category');

  // State
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const pageItems = categories.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  // Functions
  const goTo = (page: number, dir: 'next' | 'prev') => {
    if (animating || page === currentPage || page < 0 || page >= totalPages)
      return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setAnimating(false);
    }, 250);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory((prev) => (prev?.id === category.id ? null : category));
  };

  return (
    <ListError errors={error}>
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-zinc-400 dark:text-zinc-600">
          <LayoutGrid className="h-12 w-12" />
          <p className="text-sm font-medium">{t('empty')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Book container */}
          <div className="relative rounded-3xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            {/* Page corner decoration */}
            <div className="absolute right-0 top-0 h-8 w-8 overflow-hidden rounded-tr-3xl">
              <div className="absolute right-0 top-0 h-0 w-0 border-b-[2rem] border-l-[2rem] border-b-transparent border-l-maroon-200 dark:border-l-maroon-800" />
            </div>

            {/* Dots header */}
            <BookPaginationDots
              currentPage={currentPage}
              totalPages={totalPages}
              onGoTo={goTo}
            />

            {/* Cards grid */}
            <div
              className={cn(
                'duration-[250ms] grid grid-cols-1 gap-5 p-6 transition-all sm:grid-cols-2 lg:grid-cols-4',
                animating && direction === 'next' && 'translate-x-4 opacity-0',
                animating && direction === 'prev' && '-translate-x-4 opacity-0',
                !animating && 'translate-x-0 opacity-100',
              )}
            >
              {pageItems.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={handleCategoryClick}
                  isSelected={selectedCategory?.id === category.id}
                />
              ))}
              {Array.from({ length: ITEMS_PER_PAGE - pageItems.length }).map(
                (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="rounded-2xl border border-dashed border-zinc-100 dark:border-zinc-800"
                  />
                ),
              )}
            </div>

            {/* Nav footer */}
            <BookPaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              onGoTo={goTo}
            />
          </div>

          {/* Subcategory panel */}
          {selectedCategory && (
            <CategorySubcategoryPanel
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          )}
        </div>
      )}
    </ListError>
  );
}
