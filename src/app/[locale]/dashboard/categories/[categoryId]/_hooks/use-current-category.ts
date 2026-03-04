'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCurrentCategoryService } from '../_actions/fetch-current-category.service';
import { CurrentCategoryResponse } from '@/lib/types/category/category';

type UseCurrentCategoryArgs = {
  categoryId: string;
  enabled?: boolean;
};

export function useCurrentCategory({
  categoryId,
  enabled,
}: UseCurrentCategoryArgs) {
  const { data, isFetching, isPending } = useQuery({
    queryKey: ['category-details', categoryId],
    enabled: Boolean(enabled && categoryId),
    queryFn: async () => {
      const payload: ApiResponse<CurrentCategoryResponse> =
        await fetchCurrentCategoryService(categoryId);
      // Catch-error
      if ('error' in payload) {
        throw new Error(
          payload.error || 'Error During Fetch Current Category!',
        );
      }

      return payload;
    },
    staleTime: 1000 * 30,
  });

  return { data, isFetching, isPending };
}
