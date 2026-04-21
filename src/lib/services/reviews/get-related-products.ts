import { JSON_HEADER } from '@/lib/constants/api.constant';
import { RelatedProductsResponse } from '@/lib/types/products/reviews/related-products';

export const getRelatedProducts = async (categoryId: string) => {
  const response = await fetch(
    `${process.env.API_URL}/categories/${categoryId}`,
    {
      method: 'GET',
      headers: { ...JSON_HEADER },
    },
  );
  const payload: ApiResponse<RelatedProductsResponse> = await response.json();

  return payload;
};
