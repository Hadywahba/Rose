"use server";

import { JSON_HEADER } from "@/lib/constant/api.constant";
import { getToken } from "@/lib/utility/manage-token";


export async function deleteAllNotificationAction() {
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
    `https://flower.elevateegy.com/api/v1/notifications/clear-all`,

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
