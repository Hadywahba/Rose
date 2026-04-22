import { getCarts } from '@/lib/services/cart/cart-server.service';

export const getCartItems = async () => {
  try {
    const data = await getCarts();

    if (data.status===false) {
      return {
        error: new Error(data?.message),
        data: [],
      };
    }

    return {
      error: null,
      data: data.payload.cartItems ?? [],
    };
  } catch {
    return {
      error: new Error('Failed to fetch cart'),
      data: [],
    };
  }
};
