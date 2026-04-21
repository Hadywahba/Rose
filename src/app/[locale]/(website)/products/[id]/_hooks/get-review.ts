import { getReviews } from '@/lib/services/reviews/get-product-reviews';

export const getReviewProduct = async (productId: string) => {
  const response = await getReviews(productId);
  if (response.status === false) {
    throw new Error(response.message);
  }
  return response.payload;
};
