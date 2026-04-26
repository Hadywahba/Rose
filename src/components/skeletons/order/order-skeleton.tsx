import React from 'react';

export default function OrderSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {/* Header */}
          <div className="mb-4 h-6 w-1/3 rounded bg-zinc-300 dark:bg-zinc-700" />

          {/* Content lines */}
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Items */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="h-20 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
