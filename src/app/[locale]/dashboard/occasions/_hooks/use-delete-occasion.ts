import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { DeleteOccasion } from '../_actions/delete-occasion.action';

export const UseDeleteOccasion = () => {
  // Translation
  const t = useTranslations('dashboard');

  // Mutation
  const queryClient = useQueryClient();

  const {
    mutate: deleteOccasion,
    error: occasionError,
    isPending: occasionPending,
  } = useMutation({
    mutationKey: ['DeleteOccasion'],
    mutationFn: async (id: string) => {
      const payload = await DeleteOccasion(id);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t('dashboard-occasion.occasion-delete-successfully'));
      queryClient.invalidateQueries({
        queryKey: ['Occasion'],
      });
    },
    onError: (error: Error) => {
      toast.error( error.message || t('dashboard-occasion.occasion-delete-failed'));
    },
  });

  return {
    deleteOccasion,
    occasionError,
    occasionPending,
  };
};
