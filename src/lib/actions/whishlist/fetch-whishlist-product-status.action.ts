'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export async function fetchWishlistStatusAction(): Promise<ApiResponse<GetWishlistResponse>> {
  const token = await getToken();

  if (!token?.accessToken) {
    return {
      status: false,
      message: 'Unauthorized',
      payload: { wishlistItems: [] },
    } as unknown as ApiResponse<GetWishlistResponse>;
  }

  const resp = await fetch(`${process.env.API_URL}/wishlist`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: 'no-store',
  });

  const payload: ApiResponse<GetWishlistResponse> = await resp.json();
  return payload;
}
