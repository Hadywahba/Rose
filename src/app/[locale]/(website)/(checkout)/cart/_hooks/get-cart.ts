import { getCarts } from "@/lib/services/cart/cart-server.service";


export const getCartItems = async () => {
  const data = await getCarts();

  if ('error' in data) {
    throw new Error(data.error);
  }

  return data;
};
