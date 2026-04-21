'use client';

import { fetchWishlistStatusAction } from '@/lib/actions/whishlist/fetch-whishlist-product-status.action';
import { GetWishlistResponse } from '@/lib/types/wishlist/wishlist';
import { useQuery } from '@tanstack/react-query';

export function useWishlistStatus() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['wishlist-check'],
    queryFn: async () => {
      const payload: ApiResponse<GetWishlistResponse> =
        await fetchWishlistStatusAction();
      // check-error
      if (payload.status === false) {
        throw new Error(payload.message);
      }
      return payload;
    },

    staleTime: 30_000, //30Second
  });

  return { data, isLoading, isFetching };
}
