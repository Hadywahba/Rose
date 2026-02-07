'use client';

import { LoginFormFields } from '@/lib/schema/login.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export default function useLogin() {
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
  });
  return { isPending, error, login: mutate };
}
