'use server';

import { AddOccasionFormFields } from '@/lib/schema/occasion/occasion.schema';
import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { getToken } from '@/lib/utility/manage-token';

export const AddOccasion = async (data: AddOccasionFormFields) => {
  const tokenObj = await getToken();
  const token = tokenObj?.accessToken;
  
  // Create FormData to handle file upload
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('image', data.image);
  
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
