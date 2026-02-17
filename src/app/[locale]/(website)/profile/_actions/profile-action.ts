

'use server';
import { getToken } from "@/lib/utility/manage-token";


// get token

const token  =getToken();
const getHeaders = () => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const fetchProfileData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/profile-data`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const updateProfileData = async (formData: FormData) => {
  // Assuming this endpoint exists based on your requirements
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/profile-data`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` }, 
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

export const deleteAccount = async () => {
  const res = await fetch(`${process.env.API_URL}/delete-account`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete account');
  return res.json();
};