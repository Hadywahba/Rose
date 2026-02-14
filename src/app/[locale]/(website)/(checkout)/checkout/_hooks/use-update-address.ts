import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { UpdateAddressAction } from "../_action/update-address.action";
import { AddressFormSchema } from "@/lib/schema/address.schema";


export const useUpdateAddress = () => {
  // Translations
  const t = useTranslations('my-addresses');

  const router = useRouter();
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (params: { id: string; data: AddressFormSchema }) => {
      const res = await UpdateAddressAction(params.id, params.data);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(t('success-update-message'));
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(t('error-update-message', { message: error.message }));
    }
  });

  return {
    updateAddress: mutate,
    pendingUpdate: isPending,
    errorUpdate: error,
  };
}