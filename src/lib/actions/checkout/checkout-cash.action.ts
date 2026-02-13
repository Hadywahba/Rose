'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { CashCheckoutResponse, CashPayload } from '@/lib/types/checkout/checkout-cash';
import { getToken } from '@/lib/utility/manage-token';

export async function addPaymentWithCash(payload: CashPayload) {
  // Get Token
  const token = await getToken();

  const showToken = token?.accessToken;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${showToken}`,
    },
  });

  const result: ApiResponse<CashCheckoutResponse> = await response.json();

  return result;
}
