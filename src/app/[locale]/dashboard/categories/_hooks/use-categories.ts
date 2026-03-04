'use client';
import { Categories } from '@/lib/types/category/category';
import { SearchParams } from '@/lib/types/global';
import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesService } from '../_actions/fetch-all-categories.service';

export function useCategories(searchparams: SearchParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['categories', searchparams],
    queryFn: async () => {
      const payload: ApiResponse<PaginatedResponse<Categories>> =
        await fetchCategoriesService(searchparams);
      // check-error
      if ('error' in payload) {
        throw new Error(
          payload.error || 'error during fetch Categories From Dashboard!',
        );
      }
      return payload;
    },

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}
