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

      if (payload.status === false) {
        throw new Error(payload.message);
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
