import { JSON_HEADER } from '@/lib/constants/api.constant';
import type { AddToCartPayload, AddToCartResponse } from '@/lib/types/cart';
import { Product } from '@/lib/types/products/product';

export async function getProductById(productId: string) {
  const response = await fetch(
    `${process.env.API_URL!}/products/${productId}`,
  );

  const payload = await response.json();

  if (payload.error) {
    return { error: payload.error };
  }

  return payload as ApiResponse<{ product: Product }>;
}

export const addToCart = async (
  data: AddToCartPayload,
  token?: string | null,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API!}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
};
