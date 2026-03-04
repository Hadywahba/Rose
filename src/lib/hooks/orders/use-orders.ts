import { useQuery } from '@tanstack/react-query';
import { getUserOrdersAction } from '@/lib/actions/orders/get-user-orders.action';
import { GetUserOrdersResponse } from '@/lib/types/order';

export function useOrders() {

  // Queries
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const payload: ApiResponse<GetUserOrdersResponse> =
        await getUserOrdersAction();

      if ('error' in payload) {
        throw new Error(payload.error || 'error during fetch orders');
      }

      return payload;
    },
  });

  return { data, isLoading, isFetching };

}
