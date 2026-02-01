import { deleteAllNotificationAction } from "@/lib/actions/notifications/delete-all-notifications.action";
import { DeleteNotificationResponse } from "@/lib/types/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  const {
    mutate: onDeleteAll,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const payload: APIResponse<DeleteNotificationResponse> =
        await deleteAllNotificationAction();

      // check-error
      if ("error" in payload) {
        throw new Error(payload.error || "Failed to delete notification");
      }
      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notification deleted");
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onDeleteAll, error, isPending };
}
