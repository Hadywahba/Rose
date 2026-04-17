// occasion-filter-skeleton.tsx
import React from 'react';

export default function OccasionFilterCardSkeleton() {
  return (
    <div className="group relative h-auto w-auto animate-pulse overflow-hidden rounded-sm p-0">
      {/* Image skeleton */}
      <div className="h-[6.25rem] w-full bg-gray-300 object-cover lg:h-[4.625rem] lg:w-[18.875rem]" />

      {/* Overlay like the Button */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text skeleton */}
      <div className="absolute inset-10 z-10 flex items-center justify-center">
        <div className="h-4 w-1/2 rounded bg-gray-400" />
      </div>
    </div>
  );
}