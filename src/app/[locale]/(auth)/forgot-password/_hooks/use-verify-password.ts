import { useMutation } from "@tanstack/react-query";
import { VerifyResetFields } from "@/lib/types/auth/verify";
import { VerifyPassword } from "../_actions/verify-password.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";


export const useVerifyPassword = () => {
  // Translations
  const t = useTranslations('auth');

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: VerifyResetFields) => {
      const res = await VerifyPassword(data);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(t('verifyPassword.successfully-reset-toast'), {duration: 3000});
    },
  });

  return {
    verifyResetCode: mutate,
    isPending,
    error,
  };
};