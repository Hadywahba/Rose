'use client';

import { changePasswordProfile } from '@/lib/actions/profile/change-password-profile.action';
import { ChangePasswordFormFields } from '@/lib/schema/profile/change-password.schema';
import { useMutation } from '@tanstack/react-query';

export const useChangePassword = () => {
  // Mutations
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ChangePasswordFormFields) => {
      const payload = await changePasswordProfile(fields);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return {
    ChangePassword: mutate,
    isPending,
    error,
  };
};
