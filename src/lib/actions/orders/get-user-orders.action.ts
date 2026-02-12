'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export async function getUserOrdersAction() {
  const token = await getToken();

  if (!token) {
    throw new Error('you must login first');
  }

  const response = await fetch(
    `${process.env.API_URL}/orders`,
    {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
      cache: 'no-store',
    },
  );

  const payload = await response.json();
  return payload;
}
