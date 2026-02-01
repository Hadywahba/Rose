"use server";

import { JSON_HEADER } from "@/lib/constant/api.constant";
import { getToken } from "@/lib/utility/manage-token";

const   MARK_ALL_NOTIFICATIONS_AS_READ=`https://flower.elevateegy.com/api/v1/notifications/mark-all-read`;

export async function markAllNotificationsAsReadAction() {
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
    MARK_ALL_NOTIFICATIONS_AS_READ,

    {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const payload = await resp.json();

  return payload;
}
