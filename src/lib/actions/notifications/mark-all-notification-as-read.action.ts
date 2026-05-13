'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export async function markAllNotificationsAsReadAction() {
  //token
  const tokenObj = await getToken();

  const token = tokenObj?.accessToken;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notifications`, {
    method: 'PATCH',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: DeleteApiResponse = await response.json();

  return payload;
}
