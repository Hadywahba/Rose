import { JSON_HEADER } from '@/lib/constants/api.constant';
import {
  ResetPasswordPayload,
  ResetResponse,
} from '@/lib/types/auth/forget-password/reset';

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/resetPassword`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        ...JSON_HEADER,
      },
    },
  );
  const payload: ApiResponse<ResetResponse> = await response.json();
  return payload;
};
