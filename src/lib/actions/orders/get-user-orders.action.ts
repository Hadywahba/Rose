'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export async function getUserOrdersAction() {
  // Auth — retrieve the current user token
  const token = await getToken();

  // Fetch — get all orders for the authenticated user
  const response = await fetch(`${process.env.API_URL}/orders`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: 'no-store',
  });

  // Response — parse and return the JSON payload
  const payload = await response.json();
  return payload;
}
