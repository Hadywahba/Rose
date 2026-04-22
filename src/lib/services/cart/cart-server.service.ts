import { CartPayload } from '@/lib/types/cart/cart';
import { cookies } from 'next/headers';

// Display Cart

export const getCarts = async () => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/cart`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieHeader,
    },
  });

  const payload: ApiResponse<CartPayload> = await response.json();
  return payload;
};
