'use client';

import { useSyncLocalWishlistToServer } from '@/lib/hooks/local-storage/use-sync-local-whishlist-to-server';
import { LoginFormFields } from '@/lib/schema/login.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function useLogin() {
  // Translation
  const t = useTranslations('auth');
  // Hooks
  const { sendWhishlistProductsFromStorageToServer } =
    useSyncLocalWishlistToServer();

  //mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (credentials: LoginFormFields) => {
      const response = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
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
      // Sync local wishlist to server after successful login
      await sendWhishlistProductsFromStorageToServer();
    },
    onError: () => {
      toast.error(t('login.login-error'));
    },
  });
  return { isPending, error, login: mutate };
}
