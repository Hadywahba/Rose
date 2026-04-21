import { getRelatedProducts } from '@/lib/services/reviews/get-related-products';

export const getRelatedProduct = async (categoryId: string) => {
  const response = await getRelatedProducts(categoryId);
  if (response.status === false) {
    throw new Error(response.message);
  }
  return response.payload;
};
