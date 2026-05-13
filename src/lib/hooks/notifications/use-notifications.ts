import { fetchNotificationsAction } from '@/lib/actions/notifications/fetch-notifications.action';
import { NotificationsResponse } from '@/lib/types/notification';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const LIMIT = 6;

export function useNotifications() {
  // Session state from NextAuth
  const { status } = useSession();

  // Prevent unauthorized requests
  const isAuthed = status === 'authenticated';

  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['notifications', LIMIT],

    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const payload = await fetchNotificationsAction(pageParam, LIMIT);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload.payload;
    },

    // Initial page
    initialPageParam: 1,

    // Pagination handler
    getNextPageParam: (lastPage: NotificationsResponse) => {
      const { page, totalPages } = lastPage.metadata;

      return page < totalPages ? page + 1 : undefined;
    },

    // Stop fetching if unauthenticated
    enabled: isAuthed,

    retry: false,

    refetchOnWindowFocus: false,
  });

  return {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
}
