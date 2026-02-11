"use server";

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddressFormSchema } from '@/lib/schema/address.schema';
import { getToken } from '@/lib/utility/manage-token';

export const AddAddressAction = async (data: AddressFormSchema) => {
  const token = await getToken();

  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  const response = await fetch(`${process.env.API_URL}/addresses`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();  

  return payload;
};
