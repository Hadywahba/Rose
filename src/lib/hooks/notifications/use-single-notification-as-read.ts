import { markSingleNotificationsAsReadAction } from "@/lib/actions/notifications/mark-single-notification-as-read.action";
import { MarkNotificationAsReadResponse } from "@/lib/types/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSingleNotificationAsRead() {
  const queryClient = useQueryClient();

  const {
    mutate: onMarkAsRead,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (notificationId: string) => {
      const payload: ApiResponse<MarkNotificationAsReadResponse> =
        await markSingleNotificationsAsReadAction(notificationId);

      // check-error
      if (payload.status===false) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.payload.message);
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onMarkAsRead, error, isPending };
}
