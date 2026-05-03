import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ForgotPasswordFormFields } from '@/lib/schema/forgot-password';


export const forgetPassword = async (data: ForgotPasswordFormFields) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/forgot-password`,
    {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    },
  );
  const payload: ApiForgotPassResponse = await response.json();

  return payload;
};
