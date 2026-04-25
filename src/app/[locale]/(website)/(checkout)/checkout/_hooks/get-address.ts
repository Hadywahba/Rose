import { getAddress } from '@/lib/services/address/address.service';

export const getAddresses = async () => {
  try {
    const data = await getAddress();

    if (data.status === false) {
      return {
        addressError: new Error(data?.message),
        address: [],
      };
    }

    return {
      addressError: null,
      address: data.payload?.addresses ?? [],
    };
  } catch (error) {
    return {
      addressError:
        error instanceof Error ? error : new Error('Failed to fetch Address'),
      address: [],
    };
  }
};
