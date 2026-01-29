'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { VerifyResetFields } from '@/lib/types/auth/verify';

export async function VerifyPassword(data: VerifyResetFields) {
  const res = await fetch(
    `${process.env.API_URL}/auth/verifyResetCode`,
    {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    },
  );

  const payload = await res.json();

  return payload;
}
