import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { addProductAction } from '../_action/add-product.action';

export default function useAddProduct() {
  // Translation
  const t = useTranslations('products.add.toast');

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await addProductAction(formData);

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
    },
  });

  // Return API
  return { isPending, error, addProduct: mutate };
}
