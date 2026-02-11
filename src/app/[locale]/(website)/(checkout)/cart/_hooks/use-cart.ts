
import { getCart } from '@/lib/services/cart/cart.service';
import { useQuery } from '@tanstack/react-query';

export const useCart = () => {
  // Queries
  const {
    data: cart,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],

    queryFn: async () => {
      const payload = await getCart();

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return {
    cart,
    error,
    isLoading,
  };
};
