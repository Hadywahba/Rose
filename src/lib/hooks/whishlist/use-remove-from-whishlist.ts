'use client';

import { removeFromWhishlistAction } from '@/lib/actions/whishlist/remove-from-whishlist.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useRemoveFromWhishlist(productId: string) {
    const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: onRemoveFromWhishlist, isPending: removeWhishlistPending } =
    useMutation({
      mutationFn: async () => {
        const payload = await removeFromWhishlistAction(productId);

        if (payload.status === false) {
          throw new Error(payload.message);
        }

        return payload;
      },

      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey: ['wishlist-check'],
        });

        const previous = queryClient.getQueryData<string[]>(['wishlist-check']);

        queryClient.setQueryData<string[]>(['wishlist-check'], (old = []) => {
          if (!Array.isArray(old)) return [];

          return old.filter((id) => id !== productId);
        });

        return { previous };
      },

      onError: (error, _vars, context) => {
        if (context?.previous) {
          queryClient.setQueryData(['wishlist-check'], context.previous);
        }

        toast.error(error.message);
      },

      onSuccess: () => {
        toast.success(t('remove-from-whishlist'));
      },

      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['wishlist-check'],
        });
      },
    });

  return { onRemoveFromWhishlist, removeWhishlistPending };
}
