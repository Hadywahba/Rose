import { getReviews } from "@/lib/services/reviews/get-product-reviews";
import { useQuery } from "@tanstack/react-query";

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => getReviews(productId),
    // initialData,
  });
}
