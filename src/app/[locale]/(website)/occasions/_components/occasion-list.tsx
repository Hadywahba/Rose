import AppPagination from '@/components/shared/app-pagination';
import { SearchParams } from '@/lib/types/global';
import { Occasion, OccasionsResponse } from '@/lib/types/occasion/occasion';
import catchError from '@/lib/utility/catch-error';
import { getLocale } from 'next-intl/server';
import React from 'react';
import OccasionsCard from './occasion-card';
import ListError from '@/components/error/list-error';
import Empty from '@/components/shared/empty';
import { fetchAllOccasions } from '@/lib/services/occasion/alloccasion.service';

type OccasionListProps = {
  searchParams: SearchParams;
};

export default async function OccasionList({
  searchParams,
}: OccasionListProps) {
  // Translation
  const locale = await getLocale();

  //   Variables
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? '1', //default
    limit: searchParams.limit ?? '10',
  };

  const [payload, error] = await catchError<
    PaginatedResponse<OccasionsResponse>
  >(() => fetchAllOccasions(nextParams));

  const metadata = payload?.metadata ?? { totalPages: 0, currentPage: 1 };
  const totalPages = Number(metadata.totalPages);
  const currentPage = Number(metadata.currentPage);
  const occasion = payload?.occasions ?? [];

  return (
    <ListError errors={error}>
      <div className="container mx-auto px-4 py-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {occasion.length > 0 &&
            occasion.map((occ: Occasion) => (
              <OccasionsCard
                key={occ._id}
                name={occ.name}
                image={occ.image}
                productsCount={occ.productsCount}
                createdAt={occ.createdAt}
                updatedAt={occ.updatedAt}
                id={occ._id}
              />
            ))}
        </div>

        {/* Empty State */}
        {occasion.length === 0 && (
          <Empty
            subtitle="occasion.occasion-notfound-subtitle"
            title="occasion.occasion-notfound-title"
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <AppPagination
              pathname={'/occasions'}
              searchParams={searchParams}
              currentPage={currentPage}
              totalPages={totalPages}
              show={occasion.length > 0}
              locale={locale}
            />
          </div>
        )}
      </div>
    </ListError>
  );
}
