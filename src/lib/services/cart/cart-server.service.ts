import { CartPayload } from '@/lib/types/cart/cart';
import { headers } from 'next/headers';

// Display Cart
const baseUrl = process.env.NEXTAUTH_URL;
export const getCarts = async () => {
  const cookie = headers().get('cookie') || '';
  const response = await fetch(`${baseUrl}/api/cart`, {
    cache: 'no-store',
    headers: {
      cookie,
    },
  });

  const payload: ApiResponse<CartPayload> = await response.json();
  return payload;
};
