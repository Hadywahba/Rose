'use client';

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';
import ListError from '@/components/error/list-error';
import { useFilters } from '../../_hooks/use-filter';
import { useInfiniteCategories } from '../../_hooks/use-categories';
import CategoriesFilterSkeleton from '@/components/skeletons/category/category-filter-skeleton';

const CATEGORIES_PER_PAGE = 6;

export default function CategoriesFilterList() {
  // Translations
  const t = useTranslations('product.filters');

  // Hooks
  const { category, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteCategories();

  const { setFilter, filters } = useFilters({
    category: null,
  });

  // Variables
  const categories = category?.pages.flatMap((page) => page.data) || [];
  const active = filters.category;

  return (
    <ListError errors={error}>
      <div
        id="categories-scrollable"
        className="max-h-[15.125rem] w-full overflow-y-auto py-2 transition-all duration-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-200/80 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600/80 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
        onMouseEnter={(e) => {
          const isDark = document.documentElement.classList.contains('dark');
          e.currentTarget.style.scrollbarColor = isDark
            ? 'rgba(75, 85, 99, 0.8) transparent'
            : 'rgba(156, 163, 175, 0.4) transparent';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.scrollbarColor = 'transparent transparent';
        }}
      >
        <InfiniteScroll
          dataLength={categories.length}
          hasMore={hasNextPage ?? false}
          next={fetchNextPage}
          loader={
            <div className="py-2 text-center text-gray-500 dark:text-zinc-50">
              {t('loading-more')}
            </div>
          }
          endMessage={
            !error &&
            !hasNextPage &&
            categories.length > 0 && (
              <div className="py-2 text-center text-xs text-gray-400">
                {t('noMore')}
              </div>
            )
          }
          scrollableTarget="categories-scrollable"
        >
          {isLoading ? (
            <div className="grid grid-cols-1 gap-2">
              {Array.from({ length: CATEGORIES_PER_PAGE }).map((_, index) => (
                <CategoriesFilterSkeleton key={index} />
              ))}
            </div>
          ) : categories.length == 0 ? (
            <>
              {' '}
              <p>No categories found</p>
            </>
          ) : (
            <section className="grid grid-cols-1 gap-2">
              {categories.map((item) => {
                const imageUrl = item.image?.startsWith('http')
                  ? item.image
                  : `https://rose-app.elevateegy.com/uploads/${item.image}`;
                return (
                  <Button
                    onClick={() => setFilter('category', item.id)}
                    key={item.id}
                    variant="carousel"
                    className={cn(
                      'group relative flex w-full items-center justify-start gap-3 overflow-hidden rounded-sm p-2 text-left',
                      'before:absolute before:inset-0',
                      active === item.id
                        ? 'before:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(166,37,42,0.8))]'
                        : 'before:bg-black before:opacity-40 hover:before:bg-black/35 hover:before:bg-opacity-40',
                    )}
                  >
                    <Image
                      src={imageUrl}
                      width={25}
                      height={25}
                      alt={item.title}
                      priority
                      className="relative z-10 h-6 w-6 object-contain"
                    />
                    <span className="relative z-10 text-sm font-medium text-zinc-50">
                      {item.title}
                    </span>
                  </Button>
                );
              })}
            </section>
          )}
        </InfiniteScroll>
      </div>
    </ListError>
  );
}
