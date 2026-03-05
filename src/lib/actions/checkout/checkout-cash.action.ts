'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { Addresses } from '@/lib/types/address/address';
import { CashCheckoutResponse } from '@/lib/types/checkout/checkout-cash';
import { getToken } from '@/lib/utility/manage-token';

export async function addPaymentWithCash(address: Addresses) {
  // Get Token
  const token = await getToken();

  const showToken = token?.accesstoken;
  console.log(token);
  const response = await fetch(`${process.env.API}/orders`, {
    method: 'POST',
    body: JSON.stringify(address),
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${showToken}`,
    },
  });

  const result: ApiResponse<CashCheckoutResponse> = await response.json();

  return result;
}
