"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constants";
// import { getToken } from "@/lib/utility/manage-token";
import { revalidateTag } from "next/cache";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjk0MDI2YWRlMzY0ZWY2MTQwNDIzZGVlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkwNjI0Mjl9.k5_hNfTJrIkfJzCSPYoSu1on-Jkqv2nAToOGL0LavUw"
const API ="/wishlist" 

export async function addToWhishlistAction(productId: string) {
  // get-token

  // ToDo
  // const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error("you must login first");
  }

  const resp = await fetch(`${process.env.NEXT_PUBLIC_API}${API}`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  const payload = await resp.json();

  //To refetch Check Product Function Again
  revalidateTag("check-whishlist");

  return payload;
}
