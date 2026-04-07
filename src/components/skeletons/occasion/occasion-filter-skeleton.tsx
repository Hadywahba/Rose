// occasion-filter-skeleton.tsx
import React from 'react';
import OccasionCardSkeleton from './occasion-card-skeleton';

export default function OccasionFilterSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-10 mt-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <OccasionCardSkeleton key={i} />
        ))}
    </div>
  );
}
