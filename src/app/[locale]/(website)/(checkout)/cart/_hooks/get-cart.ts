import { getCarts } from '@/lib/services/cart/cart-server.service';

export const displayCart = async () => {
  try {
    const data = await getCarts();

    if (data.status === false) {
      return {
        error: new Error(data?.message),
        data: [],
      };
    }

    return {
      error: null,
      data: data.payload?.cartItems ?? [],
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error('Failed to fetch Cart'),
      data: [],
    };
  }
};
