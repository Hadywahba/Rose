'use client';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Bell, Loader } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import NotificationItem from './notification-item';
import { cn } from '@/lib/utility/tailwind-merge';
import { useNotifications } from '@/lib/hooks/notifications/use-notifications';
import EmptyNotifications from './empty-notification';
import GeneralNotificationsButtons from './general-notifications-button';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';

export default function NotificationsList() {
  // Translation

  // Hooks
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

  const { status } = useSession();

  // Variables
  const pages = data?.pages ?? [];
  const notifications = pages.flatMap((page) => page.notifications);
  const isAuthed = status === 'authenticated';
  const isSessionLoading = status === 'loading';
  const isEmpty = useMemo(() => notifications.length === 0, [notifications]);
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((noti) => !noti.isRead).length;
  }, [notifications]);
  // Handlers
  const handleFetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn('relative')}>
        {/* ✅ semantic + a11y: make trigger a real button */}
        <button
          type="button"
          aria-label={`Open notifications (${notifications.length})`}
        >
          <Bell className="h-6 w-6 dark:text-white" />

          {isAuthed && !isSessionLoading && (
            <Badge className="absolute -right-2 -top-2 flex size-3.5 items-center justify-center bg-red-500 p-0 text-[.625rem] hover:bg-red-500 dark:bg-red-600 dark:text-white">
              {unreadNotificationsCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      {isAuthed && (
        <DropdownMenuContent className="p-0" aria-label="Notifications menu">
          <DropdownMenuLabel className="dark:bg-soft-pink-200 bg-maroon-700 text-xl font-bold text-white dark:text-black">
            {/* ✅ semantic heading inside label */}
            <h2 className="text-inherit">
              Notifications <span>({notifications.length})</span>
            </h2>
          </DropdownMenuLabel>

          {/* header button */}
          <GeneralNotificationsButtons isEmpty={isEmpty} />

          {/* the scroll container */}
          {notifications.length > 0 ? (
            <section
              id="notifications-scroll"
              className="max-h-[400px] overflow-y-auto"
              aria-label="Notifications list"
            >
              <InfiniteScroll
                dataLength={notifications.length}
                scrollableTarget="notifications-scroll"
                next={handleFetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                  <div className="flex justify-center py-4" aria-live="polite">
                    <Loader
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                      focusable="false"
                    />
                    <span className="sr-only">Loading more notifications</span>
                  </div>
                }
                endMessage={
                  !isLoading && (
                    <p
                      className="py-6 text-center font-semibold capitalize"
                      role="status"
                      aria-live="polite"
                    >
                      You have seen all notifications
                    </p>
                  )
                }
              >
                {isLoading ? (
                  <div className="flex justify-center py-4" aria-live="polite">
                    <Loader
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                      focusable="false"
                    />
                    <span className="sr-only">Loading notifications</span>
                  </div>
                ) : (
                  <ul aria-label="Notifications">
                    {notifications.map((noti) => (
                      <li key={noti._id}>
                        <NotificationItem notification={noti} />
                      </li>
                    ))}
                  </ul>
                )}
              </InfiniteScroll>
            </section>
          ) : (
            <EmptyNotifications />
          )}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
