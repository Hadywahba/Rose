'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ProfileFormFields } from '@/lib/schema/profile/profile.schema';
import { getToken } from '@/lib/utility/manage-token';

export const updateUserProfile = async (data: ProfileFormFields) => {
  // Tokent
  const token = await getToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/profile`, {
    method: 'PATCH',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<UpdateProfileResponse> = await response.json();
  return result;
};
