import { getAddress } from '@/lib/services/address/address.service';

export const getAddresses = async () => {
  const data = await getAddress();

  if (data.status === false) {
    return {
      error: new Error(data.message),
      data: [],
    };
  }

  return {
    error: null,
    data: data.payload.addresses,
  };
};
