'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { EditOccasionFormFields } from '@/lib/schema/occasion/occasion.schema';
import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { getToken } from '@/lib/utility/manage-token';

export const EditOccasion = async (id: string, data: EditOccasionFormFields) => {
  const tokenObj = await getToken();
  const token = tokenObj?.accessToken;
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
