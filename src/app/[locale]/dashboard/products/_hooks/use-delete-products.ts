import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteProductsAction } from "../_actions/delete-products.action";


export const useDeleteProduct = () => {
  // Translations
  const t = useTranslations('dashboard.products');

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProductsAction(id);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(t('success-delete-message'));
    },
    onError: (error: Error) => {
      toast.error(t('error-delete-message', { message: error.message }));
    }
  });

  return {
    deleteProduct: mutate,
    pendingDelete: isPending,
    errorDelete: error,
  };
}