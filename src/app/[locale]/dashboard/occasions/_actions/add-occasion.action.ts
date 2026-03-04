'use server';

import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { getToken } from '@/lib/utility/manage-token';

export const AddOccasion = async (formData: FormData) => {
  const tokenObj = await getToken();
  const token = tokenObj?.accessToken;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/occasions`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload: ApiResponse<OccasionResponse> = await response.json();
  return payload;
};
