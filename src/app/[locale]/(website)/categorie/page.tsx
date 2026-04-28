import { SearchParams } from '@/lib/types/global';
import React, { Suspense } from 'react';
import CategoriesFetcher from './_components/categories-fetcher';
import { getTranslations } from 'next-intl/server';
import { LayoutGrid } from 'lucide-react';
import OrderSkeleton from '@/components/skeletons/order/order-skeleton';

type CategoryPageProps = {
  searchParams: SearchParams;
};

export default async function CategoriesPage({ searchParams }: CategoryPageProps) {
  const t = await getTranslations('category');

  return (
    <main className="min-h-screen bg-gradient-to-br from-maroon-50 via-white to-softpink-100 px-4 py-10 dark:from-zinc-900 dark:via-maroon-950 dark:to-zinc-900">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-maroon-100 dark:bg-maroon-900/40">
            <LayoutGrid className="h-5 w-5 text-maroon-700 dark:text-softpink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-50 md:text-3xl">
              {t('title')}
            </h1>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">{t('subtitle')}</p>
          </div>
        </div>

        <Suspense fallback={<OrderSkeleton />}>
          <CategoriesFetcher searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
