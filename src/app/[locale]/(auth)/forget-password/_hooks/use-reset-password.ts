import { useRouter } from '@/i18n/navigation';
import { resetPassword } from '@/lib/services/auth/reset-password.service';
import { ResetPasswordPayload } from '@/lib/types/auth/forget-password/reset';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useResetPassword = () => {
  // Translation
  const t = useTranslations('auth');

  // Navigation
  const router = useRouter();

  // Mutation
  const {
    mutate: resetpassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: ResetPasswordPayload) => {
      const payload = await resetPassword(data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onSuccess: () => {
      toast.success(t('reset-password.reset-message'));
      router.push('/login');
    },
  });

  return {
    resetpassword,
    isPending,
    error,
  };
};
