import React from 'react';

export default function SummarySkeleton() {
  return (
    <div className="flex w-full items-center justify-between px-4 pb-4">
      {/* Skeleton for title */}
      <div className="h-8 w-40 animate-pulse rounded bg-gray-300"></div>

      {/* Skeleton for price */}
      <div className="h-8 w-24 animate-pulse rounded bg-gray-300"></div>
    </div>
  );
}
