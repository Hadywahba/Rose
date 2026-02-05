import { toast } from "sonner";
import { AddReviewAction } from "../_actions/add-review.action";
import { RatingFormSchema } from "@/lib/schemas/add-review";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";


export const useAddReview = () => {
  // Translations
  const t = useTranslations('reviewForm');
  
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: RatingFormSchema) => {
      const res = await AddReviewAction(data);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(t('successMessage'));
    },
    onError: (error: Error) => {
      toast.error(t('errorMessage', { message: error.message }));
    }
  });

  return {
    addReview: mutate,
    isPending,
    error,
  };
}