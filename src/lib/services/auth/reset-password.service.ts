import { JSON_HEADER } from '@/lib/constants/api.constant';

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/reset-password`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...JSON_HEADER,
      },
    },
  );
  const payload: ApiVerifiyResponse = await response.json();
  return payload;
};
