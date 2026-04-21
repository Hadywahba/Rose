'use client';
import { useSyncLocalWishlistToServer } from '@/lib/hooks/local-storage/use-sync-local-whishlist-to-server';
import { LoginFormFields } from '@/lib/schema/login.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useSyncGuestCartToServer } from '@/lib/hooks/cart/use-sync-guest-cart-to-server';

export default function useLogin() {
  // Hooks
  const { sendWhishlistProductsFromStorageToServer } =
    useSyncLocalWishlistToServer();
  const { sendCartItemsFromStorageToServer } = useSyncGuestCartToServer();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (credentials: LoginFormFields) => {
      const response = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
        rememberMe: credentials.rememberMe ? 'true' : 'false',
      });
      if (response?.ok) {
        const callbackUrl =
          new URLSearchParams(location.search).get('callbackUrl') || '/';
        return (location.href = callbackUrl);
      }
      // Handle authentication error
      if (response?.error) {
        throw new Error(response.error);
      }
      return response;
    },

    onSuccess: async () => {
      // ✅ transfer local wishlist to server
      await sendWhishlistProductsFromStorageToServer();

      // ✅ transfer guest cart to server
      await sendCartItemsFromStorageToServer();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, error, login: mutate };
}
