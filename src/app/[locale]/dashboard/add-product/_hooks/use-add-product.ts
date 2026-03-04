import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addProductAction } from '../_action/add-product.action';

export default function useAddProduct() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = await addProductAction(formData);

      if ('error' in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },

    onError: (err: Error) => {
      toast.error(err.message || 'Failed to add product');
    },

    onSuccess: () => {
      toast.success('Product added successfully');
    },
  });

  return { isPending, error, addProduct: mutate };
}
