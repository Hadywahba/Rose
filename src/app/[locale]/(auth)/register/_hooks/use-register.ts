import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { registerService } from '../_action/register.action';
import { RegisterFormFields } from '@/lib/schema/register.schema';

export default function useRegister() {
  // Translation
  const t = useTranslations('auth.register.toast');

  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFormFields) => {
      const payload = await registerService(fields);
      if ('error' in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },

    onError: (error: Error) => {
      toast.error(error.message || t('error'));
    },

    onSuccess: () => {
      toast.success(t('success'));
      router.push('/login');
    },
  });

  return { isPending, error, register: mutate };
}
