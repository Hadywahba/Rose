'use server';
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "@/lib/utility/manage-token";

export const deleteAccountAction = async () => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/deleteMe`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      ...JSON_HEADER
      },
    });



    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${res.status}`);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Delete Action Error:", error instanceof Error ? error.message : String(error));
    throw error;
  }
};