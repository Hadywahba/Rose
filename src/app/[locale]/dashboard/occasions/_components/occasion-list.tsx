'use client';
import React from 'react';
import ListError from '@/components/error/list-error';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import AppPagination from '@/components/shared/app-pagination';
import { useOccasion } from '../_hooks/use-occasions';
import { DashboardTable } from '@/components/shared/dashboard/dashboard-tabel';
import { useDeleteOccasion } from '../_hooks/use-delete-occasion';
import DashboardTableSkeleton from '@/components/skeletons/dashboard/occasion-list-skeleton';
import DashboardEmptyState from '@/components/dashboard/dashboard-empty-state';

export default function OccasionList() {
  // Translations
  const locale = useLocale();

  // Navigations
  const router = useRouter();

  // Query
  const searchParams = useSearchParams();
  const searchQuery = Object.fromEntries(searchParams.entries());
  const currentPage = Number(searchParams.get('page')) || 1;
  const occasionName = searchParams.get('search') ?? undefined;
  const limit = occasionName ? 1000 : 6;
  const page = occasionName ? 1 : currentPage;
  // Hook
  const { occasion, error, isLoading } = useOccasion(limit, page, occasionName);
  const { deleteOccasion } = useDeleteOccasion();

  // Variables
  const occasionItems = occasion?.occasions || [];
  const totalPages = occasion?.metadata?.totalPages || 1;
  const showPagination =
    !isLoading && totalPages > 1 && occasionItems.length > 0;

  return (
    <>
      <div className="rounded-lg bg-white dark:bg-zinc-700">
        <ListError errors={error}>
          {isLoading ? (
            <DashboardTableSkeleton columns={2} />
          ) : occasionItems.length === 0 ? (
            <DashboardEmptyState
              title="dashboard.dashboard-occasion.empty-occasion-title"
              description="dashboard.dashboard-occasion.empty-occasion-description"
              showReset
            />
          ) : (
            <DashboardTable
              rows={occasionItems}
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
              onEdit={(row) =>
                router.push(`/dashboard/occasions/${row._id}/edit`)
              }
              onDelete={(row) => {
                deleteOccasion(row._id);
              }}
            />
          )}
        </ListError>
      </div>
      {/* pagination */}
      <div className="pb-6">
        {(showPagination || !error) && (
          <AppPagination
            currentPage={currentPage}
            locale={locale}
            totalPages={totalPages}
            show={totalPages > 1}
            pathname="/dashboard/occasions"
            searchParams={searchQuery}
          />
        )}
      </div>
    </>
  );
}
