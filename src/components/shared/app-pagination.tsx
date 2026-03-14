'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Link } from '@/i18n/navigation';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Locale } from 'next-intl';
import { useEffect, useState } from 'react';

// Types
type SearchParam = Record<string, string | string[] | undefined>;

type Props = {
  pathname: string;
  searchParams: SearchParam;
  currentPage: number;
  totalPages: number;
  windowSize?: number;
  show: boolean;
  locale: Locale;
};

// ----------------------
// Helpers
// ----------------------

function createHref(pathname: string, searchParams: SearchParam, page: number) {
  const searchQuery = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) value.forEach((v) => searchQuery.append(key, v));
    else searchQuery.set(key, value);
  });

  searchQuery.set('page', String(page));
  return `${pathname}?${searchQuery.toString()}`;
}

function getRange(current: number, total: number, windowSize: number) {
  if (total <= 1) return [];

  const first = 1;
  const last = total;

  const start = Math.max(first + 1, current - windowSize);
  const end = Math.min(last - 1, current + windowSize);

  const items: (number | 'ellipsis')[] = [];

  items.push(first);

  if (start > first + 1) items.push('ellipsis');

  for (let p = start; p <= end; p++) items.push(p);

  if (end < last - 1) items.push('ellipsis');

  if (last !== first) items.push(last);

  return items;
}

function baseBtn(disabled: boolean) {
  return [
    // mobile
    'h-9 min-w-9 px-2 text-sm',
    // tablet
    'sm:h-10 sm:min-w-10 sm:px-3',
    // desktop
    'md:h-11 md:min-w-11 md:px-4 md:text-base',
    'rounded-xl border font-medium transition-colors',
    'bg-white hover:bg-zinc-50',
    'border-zinc-200 text-zinc-900',
    'dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900',
    disabled ? 'pointer-events-none opacity-50' : '',
  ].join(' ');
}

function pageBtn(active: boolean) {
  return [
    'h-9 min-w-9 px-2 text-sm',
    'sm:h-10 sm:min-w-10 sm:px-3',
    'md:h-11 md:min-w-11 md:px-4 md:text-base',
    'rounded-xl border font-medium transition-colors',
    active
      ? 'bg-maroon-700 text-white border-maroon-700'
      : 'bg-white text-zinc-900 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100',
  ].join(' ');
}

function getLabels(locale: Locale) {
  if (locale === 'ar') {
    return {
      first: 'الصفحة الأولى',
      prev: 'الصفحة السابقة',
      next: 'الصفحة التالية',
      last: 'الصفحة الأخيرة',
    };
  }

  return {
    first: 'First page',
    prev: 'Previous page',
    next: 'Next page',
    last: 'Last page',
  };
}

// ----------------------
// Component
// ----------------------

export default function AppPagination({
  pathname,
  searchParams,
  currentPage,
  totalPages,
  windowSize = 2,
  show = true,
  locale = 'en',
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!show || totalPages <= 1) return null;

  const dynamicWindowSize = isMobile ? 1 : windowSize;
  const items = getRange(currentPage, totalPages, dynamicWindowSize);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const isRTL = locale === 'ar';
  const labels = getLabels(locale);

  const FirstIcon = isRTL ? ChevronsRight : ChevronsLeft;
  const LastIcon = isRTL ? ChevronsLeft : ChevronsRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <Pagination dir={isRTL ? 'rtl' : 'ltr'}>
      <PaginationContent className="flex flex-wrap justify-center gap-2">
        {/* First - hidden on mobile */}
        <PaginationItem className="hidden sm:block">
          <PaginationLink
            asChild
            aria-label={labels.first}
            className={baseBtn(isFirst)}
          >
            <Link href={createHref(pathname, searchParams, 1)}>
              <FirstIcon className="size-4 sm:size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Previous */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.prev}
            className={baseBtn(isFirst)}
          >
            <Link
              href={createHref(
                pathname,
                searchParams,
                Math.max(1, currentPage - 1),
              )}
            >
              <PrevIcon className="size-4 sm:size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Pages */}
        {items.map((item, i) => {
          if (item === 'ellipsis') {
            const prev = items[i - 1];
            const next = items[i + 1];
            const key = `ellipsis-${prev ?? 'start'}-${next ?? 'end'}`;

            return (
              <PaginationItem key={key}>
                <PaginationEllipsis className="px-2 text-zinc-500 dark:text-zinc-400" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${item}`}>
              <PaginationLink
                asChild
                isActive={item === currentPage}
                className={pageBtn(item === currentPage)}
              >
                <Link href={createHref(pathname, searchParams, item)}>
                  {item}
                </Link>
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.next}
            className={baseBtn(isLast)}
          >
            <Link
              href={createHref(
                pathname,
                searchParams,
                Math.min(totalPages, currentPage + 1),
              )}
            >
              <NextIcon className="size-4 sm:size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Last - hidden on mobile */}
        <PaginationItem className="hidden sm:block">
          <PaginationLink
            asChild
            aria-label={labels.last}
            className={baseBtn(isLast)}
          >
            <Link href={createHref(pathname, searchParams, totalPages)}>
              <LastIcon className="size-4 sm:size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
