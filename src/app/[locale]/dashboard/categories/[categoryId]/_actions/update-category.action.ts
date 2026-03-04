'use server';

import { getToken } from '@/lib/utility/manage-token';

type UpdateCategoryProps = {
  categoryId: string;
  formData: FormData;
};

export async function updateCategoryAction({
  categoryId,
  formData,
}: UpdateCategoryProps) {
  // get-token
  const token = await getToken();
  // guard-clause
  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: formData,
  });

  const payload = await resp.json();

  return payload;
}
