'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';

type Crumb = {
  href: string;
  label: string;
  isCurrent?: boolean;
};

type BreadcrumbsProps = {
  className?: string;
  overrides?: Record<string, string>;

  // ===== Mobile Sidebar Toggle =====
  showToggle?: boolean;
  onToggleSidebar?: () => void;
};

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'Products',
  occasions: 'Occasions',
  categories: 'Categories',
  profile: 'Profile',
  create: 'Create',
  add: 'Add',
  update: 'Update',
  edit: 'Edit',
  new: 'New',
};

/**
 * Convert a raw URL segment into a human-readable label.
 *
 * Responsibilities:
 * - Decode URL-encoded values (e.g. "%20" → space)
 * - Replace dashes with spaces
 * - Capitalize the first letter of each word
 *
 * Example:
 * "red-rose-bouquet" → "Red Rose Bouquet"
 */
function prettifySegment(seg: string): string {
  const decoded = decodeURIComponent(seg);

  return (
    decoded
      .replace(/-/g, ' ')
      // convert first character into uppercase
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

/**
 * Resolve a display label for a route segment.
 *
 * Strategy:
 * 1. If a predefined label exists in ROUTE_LABELS → use it.
 * 2. Otherwise, fallback to prettified segment.
 *
 * This ensures consistency for known routes
 * while keeping dynamic routes readable.
 */
function getLabel(seg: string): string {
  return ROUTE_LABELS[seg] ?? prettifySegment(seg);
}

//  Used to prevent IDs from appearing in breadcrumbs.
function isIdLike(seg: string): boolean {
  return (
    /^[a-f0-9]{24}$/i.test(seg) || // MongoDB ObjectId
    /^[0-9a-f-]{32,36}$/i.test(seg) // UUID
  );
}
export default function Breadcrumbs({
  className,
  overrides,
  showToggle,
  onToggleSidebar,
}: BreadcrumbsProps) {
  //Navigation
  const pathname = usePathname();

  // ===== Extract clean path segments from the current URL =====
  // - Remove query parameters (?)
  // - Remove hash fragments (#)
  // - Split by "/"
  // - Remove empty values
  const parts = (pathname || '')
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter(Boolean);

  // ===== Detect if the first segment represents a locale =====
  // If the URL starts with /en or /ar,
  // exclude it from breadcrumb labels
  // but preserve it later when rebuilding href.
  const locale = parts[0];
  const hasLocale = locale === 'en' || locale === 'ar';

  // Segments used for breadcrumb rendering
  const segments = hasLocale ? parts.slice(1) : parts;

  // ===== Initialize breadcrumb collection =====
  const crumbs: Crumb[] = [];

  // Accumulator used to rebuild the full href step by step
  // If locale exists, start with it.
  let hrefAccumulator = hasLocale ? `/${locale}` : '';

  // ===== Iterate through each route segment =====
  segments.forEach((seg, idx) => {
    // Incrementally build full path
    hrefAccumulator += `/${seg}`;

    // Skip raw database identifiers as ids
    // Example: /products/67c9.../edit
    if (isIdLike(seg)) return;

    // Resolve readable label for this segment
    let label = getLabel(seg);

    // Determine previous segment
    const prev = segments[idx - 1];

    // Detect if current segment is an action keyword
    const isAction = ['create', 'add', 'update', 'edit', 'new'].includes(seg);

    // Case: entity/create → "Create Products"
    if (isAction && prev) {
      label = `${getLabel(seg)} ${getLabel(prev)}`;
    }

    // Case: entity/[id]/edit → "Update Products"
    if (isAction && prev && isIdLike(prev)) {
      const entity = segments[idx - 2];
      if (entity) {
        label = `${getLabel(seg)} ${getLabel(entity)}`;
      }
    }

    // Allow manual override of any segment label
    if (overrides?.[seg]) {
      label = overrides[seg];
    }

    // Push final breadcrumb item
    crumbs.push({
      href: hrefAccumulator,
      label,
      isCurrent: idx === segments.length - 1,
    });
  });

  // If no breadcrumb items exist, render nothing
  if (crumbs.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Mobile Sidebar Toggle */}
      {showToggle ? (
        <button
          type="button"
          onClick={onToggleSidebar}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-xl md:hidden',
            'border border-black/10 bg-white text-zinc-800 shadow-sm',
            'transition hover:bg-zinc-50',
            'dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700',
          )}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}

      {/*Breadcrumb List*/}
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'flex flex-1 items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400',
        )}
      >
        {crumbs.map((c, i) => (
          <React.Fragment key={c.href}>
            {i !== 0 && (
              <span className="text-gray-500 dark:text-gray-700">
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
            {/*  active current path */}
            {c.isCurrent ? (
              <span className="font-medium text-maroon-600 dark:text-maroon-50">
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {c.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
