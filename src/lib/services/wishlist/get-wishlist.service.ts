import { JSON_HEADER } from '@/lib/constants/api.constant';
import { GetWishlistResponse } from '@/lib/types/wishlist/wishlist';

import { getToken } from '@/lib/utility/manage-token';

export async function fetchAllWishlistService() {
  // Variables
  const token = await getToken();

  const resp = await fetch(`${process.env.API_URL}/wishlist`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: 'no-cache',
  });

  if (!resp.ok) {
    throw new Error('Failed to fetch Wishlist');
  }

  const response: ApiResponse<GetWishlistResponse> = await resp.json();
  return response;
}
