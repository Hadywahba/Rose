'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import {
  VisaCheckoutResponse,
  VisaPayload,
} from '@/lib/types/checkout/checkout-visa';
import { getToken } from '@/lib/utility/manage-token';

export async function addPaymentWithVISA(payload: VisaPayload) {
  // Get Token
  const token = await getToken();

  const showToken = token?.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/orders/checkout`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${showToken}`,
      },
    },
  );

  const result: ApiResponse<VisaCheckoutResponse> = await response.json();

  return result;
}
