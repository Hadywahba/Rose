import { updateCartAction } from '@/lib/actions/cart/update-cart.action';
import { UpdateCartProps } from '@/lib/types/cart/cart';


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useUpdateCart() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onUpdateCart, isPending } = useMutation({
    mutationFn: async ({ cartItemId, quantity }: UpdateCartProps) => {
      const payload = await updateCartAction({ cartItemId, quantity });

      // catch-error

      if (payload.status === false) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: async () => {
      toast.success(t('product-updated-successfully'));
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onUpdateCart, isPending };
}
