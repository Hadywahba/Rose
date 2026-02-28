import { getAddress } from '@/lib/services/address/address.service';
import { useQuery } from '@tanstack/react-query';

const LIMIT = 3;

export const useAddress = () => {
  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['address', LIMIT],

    queryFn: async () => {
      const payload = await getAddress(LIMIT);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return {
    addresses,
    isLoading,
    error,
  };
};
