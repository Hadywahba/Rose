import { ForgotPasswordFormFields } from '@/lib/schemas/forgot-password';
import { forgetPassword } from '@/lib/services/auth/forget-password.service';
import { useMutation } from '@tanstack/react-query';

export const useForgot = () => {
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
  });

  return {
    forgot,
    error,
    isPending,
  };
};
