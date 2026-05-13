import {  NotificationsResponse } from '@/lib/types/notification';
import { deleteAllNotificationAction } from "@/lib/actions/notifications/delete-all-notifications.action";
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
      const payload: ApiResponse<NotificationsResponse> =
        await deleteAllNotificationAction();

      // check-error
      if (payload.status===false) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
     
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { onDeleteAll, error, isPending };
}
