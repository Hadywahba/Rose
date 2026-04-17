import { fetchAllOccasions } from '@/lib/services/occasion/alloccasion.service';
import { SearchParams } from '@/lib/types/global';
import { OccasionsResponse } from '@/lib/types/occasion/occasion';
import catchError from '@/lib/utility/catch-error';
import { cn } from '@/lib/utility/tailwind-merge';
import React from 'react';

type HomeProps = {
  searchParams: SearchParams;
};

export default async function MostPopularButton({ searchParams }: HomeProps) {
  const nextParams: SearchParams = {
    ...searchParams,
    page: '1',
    limit: searchParams.limit ?? '4',
  };

  const [payload] = await catchError<PaginatedResponse<OccasionsResponse>>(() =>
    fetchAllOccasions(nextParams),
  );

  const occasions = payload?.occasions ?? [];
  const activeOccasionId = searchParams.occasion;

  return (
    <ul className="flex flex-wrap gap-4 px-4 py-4">
      {occasions.map((occ) => {
        const isActive = activeOccasionId === occ._id;

        return (
          <li
            key={occ._id}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-2 text-base font-medium transition-colors mx-auto',
              isActive
                ? 'border-red-600 bg-red-50 text-red-600'
                : 'border-zinc-200 text-zinc-600 hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-100',
            )}
          >
            {occ.name}
          </li>
        );
      })}
    </ul>
  );
}
