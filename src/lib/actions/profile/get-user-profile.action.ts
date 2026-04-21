import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export const userProfile = async () => {
      const token = await getToken();
  const response = await fetch(`${process.env.API_URL}/users/profile`, {
    method: 'GET',

    headers: {
      ...JSON_HEADER,
       Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const result: ApiResponse<UserResponsePayload> = await response.json();

  return result;
};
