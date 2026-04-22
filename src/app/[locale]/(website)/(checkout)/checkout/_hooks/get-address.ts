import { getAddress } from '@/lib/services/address/address.service';

export const getAddresses = async () => {
  const dataAddress = await getAddress();

  if (dataAddress.status === false) {
    return {
      error: new Error(dataAddress?.message),
      dataAddress: [],
    };
  }

  return {
    error: null,
    dataAddress: dataAddress.payload.addresses ?? [],
  };
};
