'use client';
import React from 'react';

import ListError from '@/components/error/list-error';

import { useRouter } from '@/i18n/navigation';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import AppPagination from '@/components/shared/app-pagination';
import Spinner from '@/components/loader/Spinner';
import { useOccasion } from '../_hooks/use-occasions';
import { DashboardTable } from '@/components/shared/dashboard/dashboard-tabel';

export default function OccasionList() {
  // Translations
  const locale = useLocale();

  // Navigations
  const router = useRouter();

  // Query
  const searchParams = useSearchParams();
  const searchQuery = Object.fromEntries(searchParams.entries());
  const currentPage = Number(searchParams.get('page')) || 1;

  // Hook
  const { occasion, error, isLoading } = useOccasion(6, currentPage);

  // Variables
  const occasionItems = occasion?.occasions || [];
  const totalPages = occasion?.metadata?.totalPages || 1;
  const showPagination =
    !isLoading && totalPages > 1 && occasionItems.length > 0;

  return (
    <>
      <div className="rounded-lg bg-white p-5 dark:bg-zinc-700">
        <ListError errors={error}>
          {isLoading ? (
            <div className="my-48 flex items-center justify-center">
              <Spinner />
            </div>
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
              onDelete={(row) => console.log('delete', row)}
            />
          )}
        </ListError>
      </div>
      {/* pagination */}
      <div className='pb-6'>
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
