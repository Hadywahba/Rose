import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteAddressAction } from "../_action/delete-address.action";
import { useRouter } from "@/i18n/navigation";


export const useDeleteAddress = () => {
  // Translations
  const t = useTranslations('my-addresses');

  const router = useRouter();
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id:string) => {
      const res = await deleteAddressAction(id);

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
    deleteAddress: mutate,
    pendingDelete:isPending,
    errorDelete:error,
  };
}