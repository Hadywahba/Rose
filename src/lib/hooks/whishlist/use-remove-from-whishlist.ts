'use client';

import { removeFromWhishlistAction } from '@/lib/actions/whishlist/remove-from-whishlist.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useRemoveFromWhishlist(wishlistItemId: string, productId: string) {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: onRemoveFromWhishlist, isPending: removeWhishlistPending } =
    useMutation({
      mutationFn: () => removeFromWhishlistAction(wishlistItemId),

      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['wishlist-check'] });

        const previous = queryClient.getQueryData<WishlistItem[]>(['wishlist-check']);

        // Optimistic: remove by productId so UI reacts instantly
        queryClient.setQueryData<WishlistItem[]>(['wishlist-check'], (old = []) =>
          old.filter((item) => item.productId !== productId),
        );

        return { previous };
      },

      onError: (error, _vars, context) => {
        // Rollback on failure
        if (context?.previous !== undefined) {
          queryClient.setQueryData(['wishlist-check'], context.previous);
        }
        toast.error(error instanceof Error ? error.message : 'Failed to remove');
      },

      onSuccess: (payload) => {
        if (payload.status === false) {
          toast.error(payload.message);
          return;
        }
        toast.success(t('product-removed-successfully-0'));
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['wishlist-check'] });
      },
    });

  return { onRemoveFromWhishlist, removeWhishlistPending };
}
