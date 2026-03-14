'use client';
import { useSyncLocalWishlistToServer } from '@/lib/hooks/local-storage/use-sync-local-whishlist-to-server';
import { JSON_HEADER } from '@/lib/constants/api.constant';
import { LoginFormFields } from '@/lib/schema/login.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useSyncGuestCartToServer } from '@/lib/hooks/cart/use-sync-guest-cart-to-server';

export default function useLogin() {
  // Translation
  const t = useTranslations('auth');

  // Hooks
  const { sendWhishlistProductsFromStorageToServer } =
    useSyncLocalWishlistToServer();
const {sendCartItemsFromStorageToServer} = useSyncGuestCartToServer()
  const mutation = useMutation({
    mutationFn: async (data: {
      values: LoginFormFields;
      rememberMe: boolean;
    }) => {
      const { values, rememberMe } = data;

      const callbackUrl =
        new URLSearchParams(window.location.search).get('callbackUrl') || '/';

      if (!rememberMe) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/auth/signin`,
          {
            method: 'POST',
            headers: { ...JSON_HEADER },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();
        sessionStorage.setItem('user', JSON.stringify(data));
        window.location.href = callbackUrl;
        return data;
      }

      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error('Invalid credentials');
      }

      window.location.href = callbackUrl;
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

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    login: mutation.mutate,
  };
}
