import { markAllNotificationsAsReadAction } from "@/lib/actions/notifications/mark-all-notification-as-read.action";
import { MarkNotificationAsReadResponse } from "@/lib/types/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  const {
    mutate: onMarkAllAsRead,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const payload: ApiResponse<MarkNotificationAsReadResponse> =
        await markAllNotificationsAsReadAction();

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
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onMarkAllAsRead, error, isPending };
}
