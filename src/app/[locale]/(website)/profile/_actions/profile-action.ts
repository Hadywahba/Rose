
'use server';
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { User } from "@/lib/types/auth";
import { getToken } from "@/lib/utility/manage-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  } catch (error: any) {
    console.error("Delete Action Error:", error.message);
    throw error;
  }
};

export const uploadPhotoAction = async (formData: FormData) => {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/upload-photo`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);
      return uploadPhotoAction(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};