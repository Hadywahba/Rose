import { useInfiniteQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "../_types/categories";

export function useInfiniteCategories() {
  return useInfiniteQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/categories?page=${pageParam}&limit=7`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    initialPageParam: 1, 
    
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}