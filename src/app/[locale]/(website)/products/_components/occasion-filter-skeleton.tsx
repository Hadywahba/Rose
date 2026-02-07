// occasion-filter-skeleton.tsx
import React from 'react';
import { cn } from '@/lib/utility/tailwind-merge';

export default function OccasionFilterSkeleton() {
  return (
    <div
      className={cn(
        'group relative h-auto w-auto overflow-hidden rounded-sm p-0 animate-pulse',
      )}
    >
      {/* Image skeleton */}
      <div className="h-[6.25rem] w-full bg-gray-300 lg:h-[4.625rem] lg:w-[18.875rem] object-cover" />

      {/* Overlay like the Button */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text skeleton */}
      <div className="absolute inset-10 z-10 flex items-center justify-center">
        <div className="h-4 w-1/2 rounded bg-gray-400" />
      </div>
    </div>
  );
}
