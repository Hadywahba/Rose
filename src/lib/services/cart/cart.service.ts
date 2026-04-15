import { JSON_HEADER } from '@/lib/constants/api.constant';
import type { AddToCartPayload, AddToCartResponse } from '@/lib/types/cart';
import { CartResponse } from '@/lib/types/cart/cart';

// Add To Cart
export const addToCart = async (data: AddToCartPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
};
// Display Cart
export const getCart = async () => {
  const response = await fetch('/api/cart', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cart: ${response.statusText}`);
  }

  const payload: ApiResponse<CartResponse> = await response.json();
  return payload;
};


