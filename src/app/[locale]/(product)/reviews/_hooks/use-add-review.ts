import { toast } from "sonner";
import { AddReviewAction } from "../_actions/add-review.action";
import { RatingFormSchema } from "@/lib/schemas/add-review";
import { useMutation } from "@tanstack/react-query";


export const useAddReview = () => {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: RatingFormSchema) => {
      const res = await AddReviewAction(data);

      if ("error" in res) {
        throw new Error(res.error);
      }
    },

    onSuccess: () => {
      toast.success(
        'Thank you for your review! It has been submitted successfully.',
      );
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit review: ${error.message}`);
    }
  });

  return {
    addReview: mutate,
    isPending,
    error,
  };
}