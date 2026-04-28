import { DeleteAccountAction } from '@/lib/actions/profile/delete-account.action';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
export const UseDeleteAccount = () => {
  // Trsnslations
  const t = useTranslations('profile');

  // Mutation
  const {
    mutate: deleteMe,
    error: deleteError,
    isPending: deleteIsPending,
  } = useMutation({
    mutationFn: async () => {
      const payload = await DeleteAccountAction();

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
    },
  });
  return {
    deleteMe,
    deleteError,
    deleteIsPending,
  };
};
