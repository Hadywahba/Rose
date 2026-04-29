'use client';

import { fetchWishlistStatusAction } from '@/lib/actions/whishlist/fetch-whishlist-product-status.action';
import { useQuery } from '@tanstack/react-query';

export function useWishlistStatus() {
  const { data, isLoading, isFetching } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist-check'],
    queryFn: async () => {
      const payload = await fetchWishlistStatusAction();

      if (payload.status === false) {
        return [];
      }

      const items = payload.payload?.wishlistItems;
      return Array.isArray(items) ? items : [];
    },
    staleTime: 30_000,
  });

  return { data: data ?? [], isLoading, isFetching };
}
