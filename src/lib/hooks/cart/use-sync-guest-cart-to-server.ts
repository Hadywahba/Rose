// 'use client';

// import { useCallback } from 'react';
// import { useQueryClient } from '@tanstack/react-query';

// import { useGuestCartContext } from './use-guest-cart-context';
// import { addToCartAction } from '@/lib/actions/cart/add-to-cart.action';

// export function useSyncGuestCartToServer() {
//   // Hooks
//   const queryClient = useQueryClient();
//   const { cartItems, removeItem } = useGuestCartContext();

//   // Functions
//   const getSessionStorageToken = () => {
//     if (typeof window === 'undefined') return undefined;

//     try {
//       const raw = sessionStorage.getItem('user');
//       if (!raw) return undefined;

//       const parsed = JSON.parse(raw) as { token?: string };
//       return parsed.token;
//     } catch {
//       return undefined;
//     }
//   };

//   const sendCartItemsFromStorageToServer = useCallback(async () => {
//     if (!cartItems.length) return;

//     const clientToken = getSessionStorageToken();
//     const productIds = [...cartItems];

//     for (const item of productIds) {
//       const payload = await addToCartAction(
//         {
//           product: item.product._id,
//           quantity: item.quantity,
//         },
//         clientToken,
//       );

//       if ('guest' in payload) {
//         continue;
//       }

//       // If server succeeded, remove from local
//       if (!('error' in payload)) {
//         removeItem(item.product._id);
//       }
//     }

//     // Refresh server cart queries once
//     await queryClient.invalidateQueries({ queryKey: ['cart'] });
//   }, [cartItems, removeItem, queryClient]);

//   return { sendCartItemsFromStorageToServer };
// }
