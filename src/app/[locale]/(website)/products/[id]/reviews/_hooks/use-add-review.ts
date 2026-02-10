import { toast } from "sonner";
import { AddReviewAction } from "../_actions/add-review.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { RatingFormSchema } from "@/lib/schema/add-review";


export const useAddReview = () => {
  // Translations
  const t = useTranslations('review-form');
  
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: RatingFormSchema) => {
      const res = await AddReviewAction(data);

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
    addReview: mutate,
    isPending,
    error,
  };
}