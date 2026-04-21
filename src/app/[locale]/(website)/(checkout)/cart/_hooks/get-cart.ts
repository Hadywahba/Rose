import { getCarts } from '@/lib/services/cart/cart-server.service';

export const getCartItems = async () => {
  const data = await getCarts();

  if (data.status === false) {
    throw new Error(data.message);
  }

  return data;
};
