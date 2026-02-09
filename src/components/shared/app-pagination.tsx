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

// Variables

// Functions
function createHref(pathname: string, searchParams: SearchParam, page: number) {
  const searchQuery = new URLSearchParams();
  searchQuery.forEach((_, key) => searchQuery.delete(key));

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) return;
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
    'h-11 min-w-11 px-4',
    'rounded-xl border',
    'text-base font-medium',
    'transition-colors',
    'bg-white hover:bg-zinc-50',
    'border-zinc-200 text-zinc-900',
    'dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-300',
    disabled ? 'pointer-events-none opacity-50' : '',
  ].join(' ');
}

function pageBtn(active: boolean) {
  return [
    'h-11 min-w-11 px-4',
    'rounded-xl border',
    'text-base font-medium',
    'transition-colors',
    active
      ? 'bg-maroon-700 text-white border-maroon-700 hover:bg-maroon-700 dark:bg-soft-pink-200 dark:text-zinc-700'
      : 'bg-white text-zinc-900 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100',
  ].join(' ');
}
// for-A11Y
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

/**
 * AppPagination
 * ------------------------------------------------------------------
 * Server-friendly pagination component based on shadcn/ui.
 */
export default function AppPagination({
  pathname,
  searchParams,
  currentPage,
  totalPages,
  windowSize = 2,
  show = true,
  locale = 'en',
}: Props) {
  if (!show || totalPages <= 1) return null;

  const items = getRange(currentPage, totalPages, windowSize);

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
      <PaginationContent className="gap-2">
        {/* First */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.first}
            className={baseBtn(isFirst)}
          >
            <Link href={createHref(pathname, searchParams, 1)}>
              <FirstIcon className="size-5" />
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
              <PrevIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Pages + Ellipsis*/}
        {items.map((item, i) => {
          if (item === 'ellipsis') {
            const prev = items[i - 1];
            const next = items[i + 1];
            // Unique Key according to current position
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
              <NextIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>

        {/* Last */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-label={labels.last}
            className={baseBtn(isLast)}
          >
            <Link href={createHref(pathname, searchParams, totalPages)}>
              <LastIcon className="size-5" />
            </Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
