import { addToCartAction } from '@/lib/actions/cart/add-to-cart.action';
import { AddToCartProps } from '@/lib/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useAddToCart() {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const { mutate: onAddToCard, isPending } = useMutation({
    mutationFn: async ({ productId, quantity }: AddToCartProps) => {
      const payload = await addToCartAction({ productId, quantity });

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },

    onSuccess: async () => {
      toast.success(t('product-added-to-cart-successfully'));

      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onAddToCard, isPending };
}
