import { ForgotPasswordFormFields } from '@/lib/schema/forgot-password';
import { forgetPassword } from '@/lib/services/auth/forget-password.service';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useForgot = () => {
    // Translation
    const t = useTranslations('auth');

  // Mutation
  const {
    mutate: forgot,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (data: ForgotPasswordFormFields) => {
      const payload = await forgetPassword(data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onError: () => {
      toast.error(t('forget-password.forget-error'));
    },
  });

  return {
    forgot,
    error,
    isPending,
  };
};
