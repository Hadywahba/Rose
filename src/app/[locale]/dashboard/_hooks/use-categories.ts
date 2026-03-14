import { getCategories } from '@/lib/services/category/category.service';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT = 5;

export const useCategories = () => {
  // Queries
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['dashboard-categories', LIMIT],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const payload = await getCategories(LIMIT, pageParam);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    initialPageParam: 1,
    staleTime: Infinity, // never refetch unless manually invalidated
    gcTime: 1000 * 60 * 60, // 1 hour
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
};
