import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardCategoryTableSkeleton({
  rows = 6,
}: {
  rows?: number;
}) {
  return (
    <section className="min-h-[60vh]">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50 dark:bg-zinc-900">
            <TableHead className="text-zinc-900 dark:text-zinc-100">
              Name
            </TableHead>
            <TableHead className="text-zinc-900 dark:text-zinc-100">
              Products
            </TableHead>
            <TableHead className="text-right text-zinc-900 dark:text-zinc-100">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              {/* Name */}
              <TableCell>
                <Skeleton className="h-4 w-28 rounded-md" />
              </TableCell>
              {/* Products */}
              <TableCell>
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableCell>
              {/* Actions */}
              <TableCell className="text-right">
                <div className="hidden items-center justify-end gap-2 md:flex">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
                <div className="flex justify-end md:hidden">
                  <Skeleton className="size-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
