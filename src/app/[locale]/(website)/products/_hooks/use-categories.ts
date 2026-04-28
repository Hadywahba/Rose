import { getCategories } from '@/lib/services/category/category.service';
import { CategoriesResponse } from '@/lib/types/category/category';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT = 100;

export const useInfiniteCategories = () => {
  const {
    data: category,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['categories', LIMIT],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const payload = await getCategories(LIMIT, pageParam);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload.payload;
    },
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage: CategoriesResponse) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  return {
    category,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
};
