import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddOccasion } from '../_actions/add-occasion.action';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
export const UseAddOccasion = () => {
  // Translation
  const t = useTranslations('dashboard');

  // Navigation
  const router = useRouter();

  // Mutation
  const queryClient = useQueryClient();

  const {
    mutate: Addoccasion,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['AddOccasion'],
    mutationFn: async (data: FormData) => {
      const payload = await AddOccasion(data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t('dashboard-occasion.occasion-added-successfully'));
      queryClient.invalidateQueries({
        queryKey: ['Occasion', 'occasions'],
      });
      router.push('/dashboard/occasions');
    },
    onError: () => {
      toast.error(t('dashboard-occasion.occasion-add-failed'));
    },
  });

  return {
    Addoccasion,
    error,
    isPending,
  };
};
