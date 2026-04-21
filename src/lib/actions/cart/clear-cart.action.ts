'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export async function clearCartAction() {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/cart`, {
    method: 'DELETE',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload: DeleteApiResponse = await resp.json();
  return payload;
}
