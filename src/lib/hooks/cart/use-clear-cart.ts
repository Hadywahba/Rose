import { clearCartAction } from '@/lib/actions/cart/clear-cart.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useClearCart() {
  // Translations
  const t = useTranslations();
  // Hooks
  const queryClient = useQueryClient();
  const { mutate: onClearCart, isPending: clearCartIsPending } = useMutation({
    mutationFn: async () => {
      const payload = await clearCartAction();

      // catch-error

      if (payload.status===false) {
        throw new Error(
          payload.message,
        );
      }
      return payload;
    },
    onSuccess: async () => {
      toast.success(t('cart-cleared-successfully'));
      // revalidate cart
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onClearCart, clearCartIsPending };
}
