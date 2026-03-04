'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { OccasionFormFields } from '@/lib/schema/occasion/occasion.schema';
import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { getToken } from '@/lib/utility/manage-token';

export const EditOccasion = async (id: string, data: OccasionFormFields) => {
  const tokenObj = await getToken();
  const token = tokenObj?.accessToken;
  console.log(token)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/occasions/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const payload: ApiResponse<OccasionResponse> = await response.json();
  return payload;
};
