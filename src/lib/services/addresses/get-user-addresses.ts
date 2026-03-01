import { JSON_HEADER } from "@/lib/constants/api.constant";
import { AddressResponse } from "@/lib/types/user-addresses";
import { getToken } from "@/lib/utility/manage-token";

export const getUserAddresses = async () => {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/addresses`,
    {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
    },
  );
  const payload: AddressResponse = await response.json();  

  return payload.addresses;
};