'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utility/tailwind-merge';

export default function CategoriesFilterSkeleton() {
  return (
    <Button
      variant="carousel"
      className={cn(
        'group relative flex w-full items-center justify-start gap-3 overflow-hidden rounded-sm p-2 text-left',
        'before:absolute before:inset-0 before:bg-black before:opacity-20',
        'animate-pulse',
      )}
      disabled
    >
      {/* Skeleton for image */}
      <div className="relative z-10 h-6 w-6 rounded-full bg-gray-300 dark:bg-zinc-600" />

      {/* Skeleton for text */}
      <div className="relative z-10 h-4 w-24 rounded bg-gray-300 dark:bg-zinc-600" />
    </Button>
  );
}
