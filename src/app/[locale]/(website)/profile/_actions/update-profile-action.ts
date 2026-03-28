'use server';
import { User } from "@/lib/types/auth";
import { getToken } from "@/lib/utility/manage-token";

export const updateProfileData = async (data: User) => {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/editProfile`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token?.accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};
