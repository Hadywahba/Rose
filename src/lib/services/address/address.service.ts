import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddressesPayload } from '@/lib/types/address/address';
import { getToken } from '@/lib/utility/manage-token';
export const getAddress = async () => {
  const token = await getToken();
  const response = await fetch(`process.env.API_URL}/addresses`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: ApiResponse<AddressesPayload> = await response.json();
  return payload;
};
