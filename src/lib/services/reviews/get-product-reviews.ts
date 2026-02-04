import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ReviewsResponse } from "@/lib/types/products/reviews/reviews-response";

export const getReviews = async (productId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/products/${productId}/reviews`,
    {
      method: 'GET',
      headers: { ...JSON_HEADER },
    },
  );
  const payload: ApiResponse<ReviewsResponse> = await response.json();
  return payload;
};