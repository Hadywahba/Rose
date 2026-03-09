'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utility/tailwind-merge';
import { useLocale } from 'next-intl';

type DashboardTableSkeletonProps = {
  columns: number;
  rows?: number;
};

export default function DashboardTableSkeleton({
  columns,
  rows = 6,
}: DashboardTableSkeletonProps) {
  // Hook
  const locale = useLocale();

  // Variable
  const isArabic = locale === 'ar';

  return (
    <section className="min-h-[60vh]">
      <Table>
        <TableHeader>
          <TableRow className="rounded-t-lg bg-zinc-50 dark:bg-zinc-900">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </TableHead>
            ))}

            <TableHead>
              <div
                className={cn(
                  'h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700',
                  isArabic ? 'mr-auto' : 'ml-auto',
                )}
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </TableCell>
              ))}

              {/* actions */}
              <TableCell>
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
