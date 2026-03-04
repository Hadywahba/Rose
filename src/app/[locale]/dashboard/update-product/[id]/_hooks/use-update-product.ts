import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateProductAction } from '../_action/update-product.action';

export default function useUpdateProduct(id: string) {
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
      toast.error(err.message || 'Failed to update product');
    },

    onSuccess: () => {
      toast.success('Product updated successfully');
      router.refresh();
    },
  });

  return { isPending, error, updateProduct: mutate };
}
