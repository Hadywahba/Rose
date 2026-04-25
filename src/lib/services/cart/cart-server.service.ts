// Display Cart
import { getToken } from '@/lib/utility/manage-token';
import { CartPayload } from '@/lib/types/cart/cart';
import { JSON_HEADER } from '@/lib/constants/api.constant';

export const getCarts = async () => {
  const token = await getToken();
  const response = await fetch(`${process.env.API_URL}/cart`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: ApiResponse<CartPayload> = await response.json();

  return payload;
};
