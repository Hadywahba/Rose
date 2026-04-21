import { getAddress } from '@/lib/services/address/address.service';
import { useQuery } from '@tanstack/react-query';



export const useAddress = () => {
  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['address'],

    queryFn: async () => {
      const payload = await getAddress();

      if (payload.status===false) {
        throw new Error(payload.message);
      }

      return payload.payload;
    },
  });

  return {
    addresses,
    isLoading,
    error,
  };
};
