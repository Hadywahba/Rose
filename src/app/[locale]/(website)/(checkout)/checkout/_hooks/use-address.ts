import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { AddAddressAction } from "../_action/add-address.action";
import { AddressFormSchema } from "@/lib/schema/address.schema";


export const useAddAddress = () => {
  // Translations
  const t = useTranslations('my-addresses');

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: AddressFormSchema) => {
      const res = await AddAddressAction(data);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(t('success-message'));
    },
    onError: (error: Error) => {
      toast.error(t('error-message', { message: error.message }));
    }
  });

  return {
    addAddress: mutate,
    isPending,
    error,
  };
}