'use client';
import AppPagination from '@/components/shared/app-pagination';
import { useLocale, useTranslations } from 'next-intl';
import { useCategories } from '../_hooks/use-categories';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useDeleteCategory } from '../_hooks/use-delete-category';
import { SearchParams } from '@/lib/types/global';
import DashboardHeaderPage from '@/components/dashboard/dashboard-header-page';
import DashboardSearchInput from '@/components/dashboard/dashboard-search-input';
import Spinner from '@/components/loader/Spinner';
import { DashboardTable } from '@/components/dashboard/dashboard-table';
import DashboardEmptyState from '@/components/dashboard/dashboard-empty-state';

export default function DashboardCategoryWraper() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Navigations
  const router = useRouter();

  // Variables
  const rawParams = useSearchParams();
  const searchQuery = Object.fromEntries(rawParams.entries());
  const currentPage = Number(searchQuery['page'] ?? '1');
  const nextParams: SearchParams = {
    ...searchQuery,
    page: String(currentPage),
    limit: searchQuery['limit'] ?? '6',
  };

  // Queries
  const { data: payload, isLoading, isFetching } = useCategories(nextParams);
  const { onDeleteCategory } = useDeleteCategory();

  // Variables
  const categoriesList = payload?.categories || [];
  const totalPages = payload?.metadata?.totalPages ?? 1;
  const isBusy = isLoading || isFetching;
  const showPagination =
    !isLoading && totalPages > 1 && categoriesList.length > 0;

  return (
    <section className="space-y-4 rounded-md bg-white p-3 dark:bg-gray-800">
      {/* header */}
      <DashboardHeaderPage
        btnText={t('add-a-new-category')}
        title={t('all-categories')}
        path="categories/create"
      />
      {/* Search */}
      <DashboardSearchInput />
      {/* loading */}
      {isBusy && <Spinner />}
      {/* categories-list-table */}
      {!isBusy && categoriesList.length > 0 && (
        <DashboardTable
          rows={categoriesList}
          columns={[
            {
              label: 'Name',
              render: (row) => (
                <span className="font-medium capitalize">{row.name}</span>
              ),
            },
            {
              label: 'Products',
              render: (row) => `${row.productsCount} products`,
            },
          ]}
          onEdit={(row) => router.push(`/dashboard/categories/${row._id}`)}
          onDelete={(row, onSettled) =>
            onDeleteCategory(row._id, { onSettled })
          }
        />
      )}
      {/* empty-category */}
      {!isBusy && !categoriesList.length && (
        <DashboardEmptyState
          title="No categories found"
          description="No categories match your search. Try resetting to see all."
          showReset
        />
      )}
      {/* pagination */}
      {showPagination && (
        <AppPagination
          currentPage={currentPage}
          locale={locale}
          totalPages={totalPages}
          show={showPagination}
          pathname="/dashboard/categories"
          searchParams={searchQuery}
        />
      )}
    </section>
  );
}
