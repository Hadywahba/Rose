
import { getCarts } from '@/lib/services/cart/cart-server.service';
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
      const payload = await getCarts();

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload.payload.cartItems;
    },
  });

  return {
    cart,
    error,
    isLoading,
  };
};
