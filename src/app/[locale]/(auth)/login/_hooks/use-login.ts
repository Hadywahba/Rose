'use client';

import { useSyncGuestCartToServer } from '@/lib/hooks/cart/use-sync-guest-cart-to-server';
import { useSyncLocalWishlistToServer } from '@/lib/hooks/local-storage/use-sync-local-whishlist-to-server';
import { LoginFormFields } from '@/lib/schema/login.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function useLogin() {
  // Translation
  const t = useTranslations();
  // Hooks
  const { sendWhishlistProductsFromStorageToServer } =
    useSyncLocalWishlistToServer();

  const { sendCartItemsFromStorageToServer } = useSyncGuestCartToServer();

  //mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (credentials: LoginFormFields) => {
      const response = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      // Handle authentication error
      if (!response?.ok) throw new Error(response?.error || 'Login Failed');

      return response;
    },
    onSuccess: async () => {
      toast.success(t('successfully-login'), {
        duration: 3000,
        onAutoClose: async () => {
          // ✅ transfer local wishlist to server
          await sendWhishlistProductsFromStorageToServer();

          // ✅ transfer guest cart to server
          await sendCartItemsFromStorageToServer();
          // Programmatic Navigation
          const callbackUrl =
            new URLSearchParams(location.search).get('callbackUrl') || '/';
          window.location.href = callbackUrl;
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, error, login: mutate };
}
