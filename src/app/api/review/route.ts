import { JSON_HEADER } from "@/lib/constants/shared.constants";
import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

const API = (productId: string) => `/wishlist/check/${productId}`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjk0MDI2YWRlMzY0ZWY2MTQwNDIzZGVlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkwNjI0Mjl9.k5_hNfTJrIkfJzCSPYoSu1on-Jkqv2nAToOGL0LavUw"

export async function GET(request: NextRequest) {
  // query params
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ message: "productId is required" });
  }

  // ToDo
  // get token
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  //   secureCookie: process.env.NODE_ENV === "production",
  // });

  // const accessToken = token?.accessToken;

  // // Guard
  // if (!accessToken) {
  //   return Response.json(
  //     { message: "No Access Token Available ,Login First", code: 401 },
  //     { status: 401 },
  //   );
  // }

  // fetch
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API}${API(productId)}`,
    {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const payload = await resp.json();

  if (!resp.ok) {
    return NextResponse.json({
      message: payload?.message || "Failed to check wishlist",
    });
  }

  return NextResponse.json(payload);
}
