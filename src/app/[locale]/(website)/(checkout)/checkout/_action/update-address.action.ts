"use server";

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddressFormSchema } from '@/lib/schema/address.schema';
import { getToken } from '@/lib/utility/manage-token';

export const updateAddressAction = async (id:string,data: AddressFormSchema) => {
  
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/addresses/${id}`, {
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
