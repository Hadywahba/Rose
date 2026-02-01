import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ForgotPasswordFormFields } from '@/lib/schemas/forgot-password';
import { ForgotResponse } from '@/lib/types/auth/forget-password/forgot';

export const forgetPassword = async (data: ForgotPasswordFormFields) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/forgotPassword`,
    {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    },
  );
  const payload: ApiResponse<ForgotResponse> = await response.json();

  return payload;
};
