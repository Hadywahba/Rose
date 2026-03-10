'use client';

import DashboardHeaderPage from '@/components/shared/dashboard/dashboard-header';
import DashboardSearchInput from '@/components/shared/dashboard/dashboard-search-input';
import AppPagination from '@/components/shared/app-pagination';
import { DashboardTable } from '@/components/shared/dashboard/dashboard-table';
import { TopProducts } from '@/lib/types/products/product';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import DashboardEmptyState from '@/components/shared/dashboard/dashboard-empty-state';
import { cn } from '@/lib/utility/tailwind-merge';
import { useDeleteProduct } from '../_hooks/use-delete-products';

export default function DashboardAllProducts({
  allProducts,
  totalPages,
}: {
  allProducts: TopProducts[];
  totalPages: number;
}) {
  const t = useTranslations('dashboard.products');
  const locale = useLocale();

  const { deleteProduct } = useDeleteProduct();

  const rawParams = useSearchParams();
  const searchQuery = Object.fromEntries(rawParams.entries());
  const currentPage = Number(searchQuery['page'] ?? '1');

  const showPagination = totalPages > 1 && allProducts.length > 0;

  return (
    <section className="space-y-4 rounded-md bg-white p-3 dark:bg-gray-800">
      <DashboardHeaderPage
        btnText="products.add-a-new-product"
        title="products.all-products"
        path="/dashboard/products"
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
              render: (row) => `${row.price} ${t('currency')}`,
            },
            {
              label: t('quantity'),
              render: (row) => (
                <span className={cn(row.quantity < 5 && 'text-red-500')}>
                  {row.quantity}
                </span>
              ),
            },
            {
              label: t('sold'),
              render: (row) => <span>{row.sold || 0}</span>,
            },
            {
              label: t('rating'),
              render: (row) => (
                <span>
                  {row.rateAvg}/5 ({row.rateCount})
                </span>
              ),
            },
          ]}
          onDelete={(row) => deleteProduct(row._id)}
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
