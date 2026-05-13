import { markNotificationAsReadAction } from '@/lib/actions/notifications/delete-single-notification.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useReadSingleNotification() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: async (notificationId: string) => {
      const payload = await markNotificationAsReadAction(notificationId);

      if (payload.status === false) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: () => {
      toast.success('success');
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { readSingleMessage: mutate, error, isPending };
}
