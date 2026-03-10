"use server";

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';

export const deleteProducts = async (id:string) => {
  
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
  });

  const payload = await response.json();  

  return payload;
};
