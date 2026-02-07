'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type Filters = Record<string, string | null>;

export function useFilters(defaults: Filters = {}) {
  // Navigation
  const router = useRouter();

  //Hook
  const searchParams = useSearchParams();

  //Read available filters from URL search params
  const filters = useMemo(() => {
    const result: Filters = {};
    Object.keys(defaults).forEach((key) => {
      result[key] = searchParams.get(key) ?? defaults[key];
    });
    return result;
  }, [searchParams, defaults]);

  //  avoid re-rendering unless router or searchParams changes
  const setFilter = useCallback(
    (key: string, value?: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set(key, value);
      else params.delete(key);

      params.delete('page'); // reset pagination لو موجود
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Function is used to reset one filter only
  const resetFilter = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete(key);
      params.delete('page');

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  //  Function is used to reset All filters
  const resetAll = useCallback(() => {
    router.push('/products');
  }, [router]);

  return {
    filters,
    setFilter,
    resetFilter,
    resetAll,
  };
}
