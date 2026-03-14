import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { updateProductAction } from '../_action/update-product.action';

export default function useUpdateProduct(id: string) {
  // Translation
  const t = useTranslations('products.update.toast');

  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const payload = await updateProductAction(id, data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },

    onError: (err: Error) => {
      toast.error(err.message || t('error'));
    },

    onSuccess: () => {
      toast.success(t('success'));
      router.refresh();
    },
  });

  // Return API
  return { isPending, error, updateProduct: mutate };
}
