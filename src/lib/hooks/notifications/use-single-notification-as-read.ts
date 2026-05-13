import { markSingleNotificationsAsReadAction } from "@/lib/actions/notifications/mark-single-notification-as-read.action";
import { NotificationsResponse } from "@/lib/types/notification";
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
      const payload: ApiResponse<NotificationsResponse> =
        await markSingleNotificationsAsReadAction(notificationId);

      // check-error
      if (payload.status===false) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onMarkAsRead, error, isPending };
}
