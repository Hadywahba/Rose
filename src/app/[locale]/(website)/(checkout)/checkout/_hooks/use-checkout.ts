import { getAddress } from '@/lib/services/address/address.service';
import { AddressesResponse } from '@/lib/types/address/address';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT = 3;

export const useAddress = () => {
  const {
    data: addresses,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['address', LIMIT],

    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const payload = await getAddress(LIMIT, pageParam);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage: AddressesResponse) => {
      const addresses = lastPage?.addresses;

      if (!addresses || addresses.length < LIMIT) {
        return undefined;
      }

      return addresses.length + 1;
    },
  });

  return {
    addresses,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
};
