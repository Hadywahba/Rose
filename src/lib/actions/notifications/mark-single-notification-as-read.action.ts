"use server";

import { JSON_HEADER } from "@/lib/constant/api.constant";
import { getToken } from "@/lib/utility/manage-token";

const MARK_SINGLE_NOTIFICATIONS =`https://flower.elevateegy.com/api/v1/notifications/mark-read`;

export async function markSingleNotificationsAsReadAction(
  notificationId: string
) {
  // get token
  const token = await getToken();
  // Guard
  if (!token?.accessToken) {
    return Response.json(
      { message: "No Access Token Available ,Login First", code: 401 },
      { status: 401 }
    );
  }

  const resp = await fetch(
    MARK_SINGLE_NOTIFICATIONS,

    {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ notificationIds: [notificationId] }),
    }
  );

  const payload = await resp.json();

  return payload;
}
