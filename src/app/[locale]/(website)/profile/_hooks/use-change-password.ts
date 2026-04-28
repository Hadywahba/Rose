'use client';

import { changePasswordProfile } from '@/lib/actions/profile/change-password-profile.action';
import { ChangePasswordFormFields } from '@/lib/schema/profile/change-password.schema';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useChangePassword = () => {
  // Trsnslations
  const t = useTranslations('profile');

  // Mutations
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ChangePasswordFormFields) => {
      const payload = await changePasswordProfile(fields);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t('password.success'));
    },

    onError: () => {
      toast.error(t('password.error'));
    },
  });

  return {
    ChangePassword: mutate,
    isPending,
    error,
  };
};
