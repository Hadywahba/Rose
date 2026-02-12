"use client";

import { fetchCartService } from "@/lib/actions/cart/fetch-cart.service";
import { CartResponse } from "@/lib/types/cart";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const payload: ApiResponse<CartResponse> = await fetchCartService();
      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during fetch cart");
      }
      return payload;
    },

    staleTime: 30_000, //30Second
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isFetching };
}
