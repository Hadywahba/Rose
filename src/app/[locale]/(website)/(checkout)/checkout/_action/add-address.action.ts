'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddressFormSchema } from '@/lib/schema/address.schema';
import { AddAddressPayload } from '@/lib/types/address/address';
import { getToken } from '@/lib/utility/manage-token';

export const addAddressAction = async (data: AddressFormSchema) => {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/addresses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<AddAddressPayload> = await response.json();

  return payload;
};
