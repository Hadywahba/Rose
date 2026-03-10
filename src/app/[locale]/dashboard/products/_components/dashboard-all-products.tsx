'use client';

import DashboardHeaderPage from '@/components/shared/dashboard/dashboard-header';
import DashboardSearchInput from '@/components/shared/dashboard/dashboard-search-input';
import AppPagination from '@/components/shared/app-pagination';
import { DashboardTable } from '@/components/shared/dashboard/dashboard-table';
import { TopProducts } from '@/lib/types/products/product';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import DashboardEmptyState from '@/components/shared/dashboard/dashboard-empty-state';

export default function DashboardAllProducts({
  allProducts,
  totalPages,
}: {
  allProducts: TopProducts[];
  totalPages: number;
}) {
  const t = useTranslations();
  const locale = useLocale();

  const rawParams = useSearchParams();
  const searchQuery = Object.fromEntries(rawParams.entries());
  const currentPage = Number(searchQuery['page'] ?? '1');

  const showPagination = totalPages > 1 && allProducts.length > 0;

  return (
    <section className="space-y-4 rounded-md bg-white p-3 dark:bg-gray-800">
      <DashboardHeaderPage
        btnText={t('add-a-new-product')}
        title={t('all-products')}
        path="products/create"
      />

      <DashboardSearchInput />

      {allProducts.length > 0 ? (
        <DashboardTable
          rows={allProducts}
          columns={[
            {
              label: t('name'),
              render: (row) => (
                <span className="font-medium capitalize">{row.title}</span>
              ),
            },
            {
              label: t('price'),
              render: (row) => `$${row.price}`,
            },
            {
              label: t('quantity'),
              render: (row) => (
                <span className="text-gray-500 dark:text-gray-400">
                  {row.quantity}
                </span>
              ),
            },
            {
              label: t('sold'),
              render: (row) => (
                <span className="text-gray-500 dark:text-gray-400">
                  {row.sold}
                </span>
              ),
            },
            {
              label: t('rating'),
              render: (row) => (
                <span className="inline-flex items-center gap-1 text-sm font-medium text-yellow-500">
                  ⭐ {row.rateAvg}/5 ({row.rateCount})
                </span>
              ),
            },
          ]}
          onEdit={(row) => {}}
          onDelete={(row, onSettled) => {}}
        />
      ) : (
        <DashboardEmptyState
          title={t('no-products-found')}
          description={t('no-products-match')}
          showReset
        />
      )}

      <AppPagination
        currentPage={currentPage}
        locale={locale}
        totalPages={totalPages}
        show={showPagination}
        pathname="/dashboard/products"
        searchParams={searchQuery}
      />
    </section>
  );
}
