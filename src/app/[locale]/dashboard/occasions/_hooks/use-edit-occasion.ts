import { EditOccasionFormFields } from '@/lib/schema/occasion/occasion.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditOccasion } from '../_actions/edit-occasion.action';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';

export const UseEditOccasionName = (id: string) => {
  // Translation
  const t = useTranslations('dashboard');

  // Navigation
  const router = useRouter();

  // Mutation
  const queryClient = useQueryClient();

  // Mutation
  const {
    mutate: editoccasion,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['EditOccasion'],
    mutationFn: async (data: EditOccasionFormFields) => {
      const payload = await EditOccasion(id, data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t('dashboard-occasion.occasion-edit-successfully'));
      queryClient.invalidateQueries({
        queryKey: ['Occasion', 'occasions'],
      });
      router.push('/dashboard/occasions');
    },
    onError: () => {
      toast.error(t('dashboard-occasion.occasion-edit-failed'));
    },
  });

  return {
    editoccasion,
    error,
    isPending,
  };
};
