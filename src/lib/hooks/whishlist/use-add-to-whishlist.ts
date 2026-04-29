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
      mutationFn: () => addToWhishlistAction(productId),

      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['wishlist-check'] });

        const previous = queryClient.getQueryData<WishlistItem[]>(['wishlist-check']);

        // Optimistic: add temp item so UI reacts instantly
        queryClient.setQueryData<WishlistItem[]>(['wishlist-check'], (old = []) => {
          if (old.some((item) => item.productId === productId)) return old;
          return [...old, { id: `temp-${productId}`, productId } as WishlistItem];
        });

        return { previous };
      },

      onError: (error, _vars, context) => {
        // Rollback on failure
        if (context?.previous !== undefined) {
          queryClient.setQueryData(['wishlist-check'], context.previous);
        }
        toast.error(error instanceof Error ? error.message : 'Failed to add');
      },

      onSuccess: (payload) => {
        if (payload.status === false) {
          toast.error(payload.message);
          return;
        }
        toast.success(t('product-added-successfully'));
      },

      onSettled: () => {
        // Always sync with server after mutation
        queryClient.invalidateQueries({ queryKey: ['wishlist-check'] });
      },
    });

  return { onAddToWhishlist, addWhishlistPending };
}
