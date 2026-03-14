'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { DeleteOccasionResponse } from '@/lib/types/occasion/occasion';
import { getToken } from '@/lib/utility/manage-token';

export const DeleteOccasion = async (id: string) => {
  const tokenObj = await getToken();
  const token = tokenObj?.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/occasions/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,

        ...JSON_HEADER,
      },
    },
  );

  const payload: ApiResponse<DeleteOccasionResponse> = await response.json();

  return payload;
};
