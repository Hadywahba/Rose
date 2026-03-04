'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utility/tailwind-merge';
import { MoreHorizontalIcon, Pencil, Trash2 } from 'lucide-react';
import { useLocale } from 'next-intl';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ColumnDef<T> = {
  label: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type DashboardTableProps<T extends { _id: string }> = {
  rows: T[];
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

//Action Buttons
function RowActions<T>({
  row,
  onEdit,
  onDelete,
}: {
  row: T;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  return (
    <TableCell className="text-right">
      {/* Desktop */}
      <div className="hidden items-center justify-end gap-2 md:flex">
        {/* edit */}
        <button
          onClick={() => onEdit?.(row)}
          className="flex items-center gap-1 rounded-lg bg-[#0063D01A] px-4 py-2 font-inter text-sm font-medium capitalize text-blue-600 transition-colors hover:bg-blue-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <Pencil className="size-4" />
          edit
        </button>
        {/* delete */}
        <button
          onClick={() => onDelete?.(row)}
          className="flex items-center gap-1 rounded-lg bg-[#FF00001A] px-4 py-2 font-inter text-sm font-medium capitalize text-red-600 transition-colors hover:bg-maroon-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <Trash2 className="size-4" />
          delete
        </button>
      </div>

      {/* Mobile */}
      <div className="flex justify-end md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* edit */}
            <DropdownMenuItem
              onClick={() => onEdit?.(row)}
              className="cursor-pointer gap-2 font-inter text-sm font-medium capitalize text-blue-600 hover:bg-blue-200 focus:bg-blue-50 focus:text-blue-600"
            >
              <Pencil className="size-4" />
              edit
            </DropdownMenuItem>

            {/* delete */}
            <DropdownMenuItem
              onClick={() => onDelete?.(row)}
              className="cursor-pointer gap-2 font-inter text-sm font-medium capitalize text-red-600 hover:bg-maroon-100 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
            >
              <Trash2 className="size-4" />
              delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  );
}

//Main Component
export function DashboardTable<T extends { _id: string }>({
  rows,
  columns,
  onEdit,
  onDelete,
}: DashboardTableProps<T>) {
  // Hook
  const locale = useLocale();

  // Variable
  const isArabic = locale === 'ar';

  return (
    <section className="min-h-[60vh]">
      <Table>
        <TableHeader>
          <TableRow className="rounded-t-lg bg-zinc-50 dark:bg-zinc-900">
            {columns.map((col) => (
              <TableHead
                key={col.label}
                className={cn(
                  'text-zinc-900 dark:text-zinc-100',
                  isArabic ? 'text-right' : 'text-left',
                  col.className,
                )}
              >
                {col.label}
              </TableHead>
            ))}
            <TableHead
              className={cn(
                'capitalize text-zinc-900 dark:text-zinc-100',
                isArabic ? 'text-left md:pl-20' : 'text-right md:pr-20',
              )}
            >
              actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              {columns.map((col) => (
                <TableCell key={col.label} className={col.className}>
                  {col.render(row)}
                </TableCell>
              ))}
              <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
