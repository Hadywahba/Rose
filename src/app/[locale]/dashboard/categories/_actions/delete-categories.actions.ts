"use server";

import { getToken } from "@/lib/utility/manage-token";

export async function deleteCategoryAction(categoryId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(
    `${process.env.API_URL}/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload = await resp.json();
  return payload;
}
