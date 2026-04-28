'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ChangePasswordFormFields } from '@/lib/schema/profile/change-password.schema';
import { getToken } from '@/lib/utility/manage-token';

export const changePasswordProfile = async (data: ChangePasswordFormFields) => {
  // Tokent
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/change-password`,
    {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result: ApiChangePasswordResponse = await response.json();
  return result;
};
