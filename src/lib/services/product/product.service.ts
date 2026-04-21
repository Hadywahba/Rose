import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddToCartPayload, AddToCartResponse } from '@/lib/types/cart/cart';
import { Product } from '@/lib/types/products/product';

export async function getProductById(productId: string) {
  // Request — no-store ensures fresh data on every render (no Next.js cache)
  const response = await fetch(
    `${process.env.API_URL!}/products/${productId}`,
    { cache: 'no-store' },
  );

  // Response
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
  // Request
  const response = await fetch(`${process.env.NEXT_PUBLIC_API!}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  // Response
  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
};
