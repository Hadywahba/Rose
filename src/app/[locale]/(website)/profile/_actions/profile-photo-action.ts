'use server';
import { getToken } from "@/lib/utility/manage-token";

export const uploadPhotoAction = async (formData: FormData) => {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/upload-photo`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

