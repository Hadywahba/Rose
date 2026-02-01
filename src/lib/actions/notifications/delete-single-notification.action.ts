"use server";

import { JSON_HEADER } from "@/lib/constant/api.constant";
import { getToken } from "@/lib/utility/manage-token";

const DELETE_SINGLE_NOTIFICATION= (notificationId: string) =>
    `https://flower.elevateegy.com/api/v1/notifications/${notificationId}`;

export async function deleteSingleNotificationAction(notificationId: string) {
  //token
  const token = await getToken();
  // Guard
  if (!token?.accessToken) {
    return Response.json(
      { message: "No Access Token Available ,Login First", code: 401 },
      { status: 401 }
    );
  }

  const resp = await fetch(
   DELETE_SINGLE_NOTIFICATION(notificationId),

    {
      method: "DELETE",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const payload = await resp.json();

  return payload;
}
