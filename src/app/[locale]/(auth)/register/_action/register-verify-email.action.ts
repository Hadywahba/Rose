'use server';

import { RegisterEmailFormFields } from '@/lib/schema/register.schema';

export const registerVerifiyEmail = async (data: RegisterEmailFormFields) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/send-email-verification
`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    },
  );
  const payload: ApiVerifiyRegisterResponse = await response.json();

  return payload;
};
