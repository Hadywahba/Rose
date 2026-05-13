'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export async function markNotificationAsReadAction(notificationId: string) {
  //token
  const tokenObj = await getToken();

  const token = tokenObj?.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/notifications/${notificationId}`,
    {
      method: 'PATCH',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isRead: true,
      }),
    },
  );

  const payload = await response.json();

  return payload;
}
