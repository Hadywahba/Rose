import { RegisterFormFields } from '@/lib/schema/register.schema';
import { RegisterResponse } from '@/lib/types/auth';

export async function registerService(fields: RegisterFormFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const payload: ApiResponse<RegisterResponse> = await response.json();
  return payload;
}
