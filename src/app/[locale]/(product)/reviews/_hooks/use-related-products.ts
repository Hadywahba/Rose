import { getRelatedProducts } from "@/lib/services/reviews/get-related-products";
import { useQuery } from "@tanstack/react-query";

export function useRelatedProducts(productId: string) {
  return useQuery({
    queryKey: ['relatedProducts', productId],
    queryFn: () => getRelatedProducts(productId),
  });
}
