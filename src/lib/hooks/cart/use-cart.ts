'use client';

import { getCart } from '@/lib/services/cart/cart.service';
import { useQuery } from '@tanstack/react-query';

export function useCart() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const payload = await getCart();
      // check-error
      if (payload.status === false) {
        throw new Error(payload.message);
      }
      return payload.payload.cartItems;
    },

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}
