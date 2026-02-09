import { useInfiniteQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "../_types/categories";
import { getCategories } from "@/lib/services/categories/categories.service";

export function useInfiniteCategories() {
  return useInfiniteQuery<CategoriesResponse>({
    queryKey: ["categories", 7],
    queryFn: ({ pageParam = 1 }) =>
      getCategories(pageParam as number, 7),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
