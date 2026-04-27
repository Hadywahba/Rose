'use client';

import { updateUserProfile } from '@/lib/actions/profile/update-user-profile.action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ProfileFormFields } from '@/lib/schema/profile/profile.schema';

export const useUpdateProfile = () => {
  // Trsnslations
  const t = useTranslations('profile');

  // Navigations
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ProfileFormFields) => {
      const payload = await updateUserProfile(fields);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      router.refresh();
    },

    onError: (error) => {
      toast.error(t('updateError'));
      console.log(error);
    },
  });

  return {
    updateProfile: mutate,
    isPending,
    error,
  };
};
