
'use server';
import { getToken } from "@/lib/utility/manage-token";

const getHeaders = async () => {
  const token = await getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchProfileData = async () => {
  const headers = await getHeaders();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/profile-data`, { headers });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};





