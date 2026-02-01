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
      const payload: APIResponse<MarkNotificationAsReadResponse> =
        await markAllNotificationsAsReadAction();

      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "Failed to mark notification as read");
      }
      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notification marked as read");
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onMarkAllAsRead, error, isPending };
}
