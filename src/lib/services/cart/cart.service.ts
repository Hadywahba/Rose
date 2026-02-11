import { CartResponse } from '@/lib/types/cart/cart';

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
