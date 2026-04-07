import { getOccasion } from '@/lib/services/occasion/occasion-content.service';
import { OccasionsResponse } from '@/lib/types/occasion/occasion';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT = 6;

export const useOccasion = () => {
  // Queries
  const {
    data: occasion,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['occasions', LIMIT],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const payload = await getOccasion(LIMIT, pageParam);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage: OccasionsResponse) => {
      const { currentPage, totalPages } = lastPage.metadata;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },
  });

  return {
    occasion,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
};
