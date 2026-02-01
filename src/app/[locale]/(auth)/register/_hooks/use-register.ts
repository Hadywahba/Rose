import { useMutation } from '@tanstack/react-query';
import { registerService } from '../_services/register.service';
import { useRouter } from 'next/navigation';
import { RegisterFields } from '@/lib/types/auth';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function useRegister() {
  // Translation
  const t = useTranslations('auth.register.toast');

  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const payload = await registerService(fields);
      if ('error' in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },

    onMutate: () => {
      toast.loading(t('loading'));
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
