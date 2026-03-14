'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useGuestCartContext } from './use-guest-cart-context';
import { addToCartAction } from '@/lib/actions/cart/add-to-cart.action';

export function useSyncGuestCartToServer() {
  const queryClient = useQueryClient();
  const { cartItems, removeItem } = useGuestCartContext();

  const sendCartItemsFromStorageToServer = useCallback(async () => {
    if (!cartItems.length) return;

    const productIds = [...cartItems];

    for (const item of productIds) {
      const payload = await addToCartAction({
        productId: item.product._id,
        quantity: item.quantity,
      });

      // If server succeeded, remove from local
      if (payload?.message === 'success') {
        removeItem(item._id);
      }
    }

    // Refresh server wishlist queries once
    await queryClient.invalidateQueries({ queryKey: ['cart'] });
  }, [cartItems, removeItem, queryClient]);

  return { sendCartItemsFromStorageToServer };
}
