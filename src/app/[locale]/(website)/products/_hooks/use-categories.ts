import { useInfiniteQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "../_types/categories";
import { fetchCategoriesAction } from "../_actions/categories"; // استيراد الـ Action

export function useInfiniteCategories() {
  return useInfiniteQuery<CategoriesResponse>({
    queryKey: ["categories"],
    // التعديل هنا: الـ Hook الآن ينادي على الدالة فقط
    queryFn: ({ pageParam = 1 }) => fetchCategoriesAction(pageParam as number),
    
    initialPageParam: 1, 
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}