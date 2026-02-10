import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RelatedProductsResponse } from "@/lib/types/products/reviews/related-products";

export const getRelatedProducts = async (productId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/related/category/${productId}`,
    {
      method: 'GET',
      headers: { ...JSON_HEADER },
    },
  );
  const payload: RelatedProductsResponse = await response.json();
  
  return payload.relatedProducts;
};