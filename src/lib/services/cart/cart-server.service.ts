import { CartResponse } from '@/lib/types/cart/cart';
import { headers } from 'next/headers';

// Display Cart
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
export const getCarts = async () => {
  const cookie = headers().get('cookie') || '';
  const response = await fetch(`${baseUrl}/api/cart`, {
    cache: 'no-store',
    headers: {
      cookie,
    },
  });

  const payload: ApiResponse<CartResponse> = await response.json();
  return payload;
};