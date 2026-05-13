import { JSON_HEADER } from '@/lib/constants/api.constant';
import { NotificationsResponse } from '@/lib/types/notification';
import { getToken } from '@/lib/utility/manage-token';

export async function fetchNotificationsAction(
  pageNumber: number,
  limit: number,
) {
  // token
  const tokenObj = await getToken();

  const token = tokenObj?.accessToken;

  const params = new URLSearchParams({
    page: pageNumber.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/notifications?${params}`,
    {
      cache: 'no-store',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const payload: ApiResponse<NotificationsResponse> = await response.json();

  return payload;
}
