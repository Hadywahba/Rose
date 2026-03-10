import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { deleteProducts } from "../_actions/delete-products";


export const useDeleteProduct = () => {
  // Translations
  const t = useTranslations('dashboard.products');

  const router = useRouter();
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProducts(id);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(t('success-delete-message'));
      router.refresh();
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