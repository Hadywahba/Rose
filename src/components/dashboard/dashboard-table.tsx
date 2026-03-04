"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

//Types
export type ColumnDef<T> = {
  label: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type DashboardTableProps<T extends { _id: string }> = {
  rows: T[];
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T, onSettled: () => void) => void;
};

// Action Buttons
function RowActions<T extends { _id: string }>({
  row,
  loadingId,
}: {
  row: T;
  loadingId: string | null;
}) {
  // is this row currently loading
  const isRowLoading = loadingId === row._id;

  return (
    <TableCell className="text-right">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-end gap-2">
        {/* edit */}
        <button
          data-action="edit"
          data-id={row._id}
          disabled={isRowLoading}
          className="bg-zinc-100 px-4 py-2 flex items-center gap-1 rounded-lg text-blue-600
            hover:bg-blue-50 transition-colors text-sm dark:bg-zinc-800 dark:hover:bg-zinc-700
            disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          <Pencil className="w-3.5 h-3.5 pointer-events-none" />
          Edit
        </button>
        {/* delete */}
        <button
          data-action="delete"
          data-id={row._id}
          disabled={isRowLoading}
          className="bg-zinc-100 px-4 py-2 flex items-center gap-1 rounded-lg text-red-600
            hover:bg-red-50 transition-colors text-sm dark:bg-zinc-800 dark:hover:bg-zinc-700
            disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          {isRowLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin pointer-events-none" />
          ) : (
            <Trash2 className="w-3.5 h-3.5 pointer-events-none" />
          )}
          Delete
        </button>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              disabled={isRowLoading}
            >
              {isRowLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MoreHorizontalIcon className="w-4 h-4" />
              )}
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* edit */}
            <DropdownMenuItem
              data-action="edit"
              data-id={row._id}
              disabled={isRowLoading}
              className="gap-2 cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 pointer-events-none" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* delete */}
            <DropdownMenuItem
              data-action="delete"
              data-id={row._id}
              disabled={isRowLoading}
              className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
            >
              <Trash2 className="w-3.5 h-3.5 pointer-events-none" />
              Delete
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
  //States
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // single delegated handler on the table container
  function handleTableClick(e: React.MouseEvent<HTMLElement>) {
    const target = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-action]",
    );
    if (!target) return;

    const action = target.dataset.action;
    const id = target.dataset.id;
    if (!action || !id) return;

    const row = rows.find((r) => r._id === id);
    if (!row) return;

    if (action === "edit") {
      onEdit?.(row);
    }

    if (action === "delete") {
      setLoadingId(id);
      onDelete?.(row, () => setLoadingId(null));
    }
  }

  return (
    <section className="min-h-[60vh]" onClick={handleTableClick}>
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50 dark:bg-zinc-900 rounded-t-lg">
            {columns.map((col) => (
              <TableHead
                key={col.label}
                className={`text-zinc-900 dark:text-zinc-100 ${col.className ?? ""}`}
              >
                {col.label}
              </TableHead>
            ))}
            <TableHead className="text-right text-zinc-900 dark:text-zinc-100">
              Actions
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
              <RowActions row={row} loadingId={loadingId} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
