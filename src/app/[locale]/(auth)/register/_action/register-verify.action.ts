'use server';

import { RegisterVerifyFormFields } from "@/lib/schema/register.schema";



export const registerVerifiyCode = async (data: RegisterVerifyFormFields) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/confirm-email-verification`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    },
  );
  const payload: ApiVerifiyRegisterResponse = await response.json();

  return payload;
};
