'use server';

import { getToken } from '@/lib/utility/manage-token';

export async function createCategoryAction(formData: FormData) {
  // get-token
  const token = await getToken();

  // guard-clause
  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/categories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: formData,
  });

  const payload = await resp.json();

  return payload;
}
