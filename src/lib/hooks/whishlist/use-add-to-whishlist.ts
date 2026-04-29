'use client';

import { addToWhishlistAction } from '@/lib/actions/whishlist/add-to-whishlist.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useAddToWhishlist(productId: string) {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: onAddToWhishlist, isPending: addWhishlistPending } =
    useMutation({
      mutationFn: async () => {
        const payload = await addToWhishlistAction(productId);

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

          if (old.includes(productId)) return old;

          return [...old, productId];
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
        toast.success(t('product-added-successfully'));
      },

      // 🔄 sync lightly
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['wishlist-check'],
        });
      },
    });

  return { onAddToWhishlist, addWhishlistPending };
}
