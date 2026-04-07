import { SearchParams } from '@/lib/types/global';
import React, { Suspense } from 'react';
import OccasionList from './_components/occasion-list';
import OccasionFilterSkeleton from '@/components/skeletons/occasion/occasion-filter-skeleton';

type OccasionListProps = {
  searchParams: SearchParams;
};
export default function page({ searchParams }: OccasionListProps) {
  return (
    <div>
      <Suspense fallback={<OccasionFilterSkeleton />}>
        <OccasionList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
