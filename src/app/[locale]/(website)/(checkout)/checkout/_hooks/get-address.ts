import { getAddress } from '@/lib/services/address/address.service';

export const getAddresses = async () => {
  try {
    const data = await getAddress();

    if (data.status===false) {
      return {
        error: new Error(data?.message ?? 'Failed to fetch addresses'),
        data: [],
      };
    }

    return {
      error: null,
      data: data.payload.addresses ?? [],
    };
  } catch {
    return {
      error: new Error('Failed to fetch addresses'),
      data: [],
    };
  }
};
