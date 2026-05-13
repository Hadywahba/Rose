'use client';

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
import { useTranslations } from 'next-intl';

export default function NotificationsList() {
  // Translation
  const t = useTranslations('notifications');

  // Hook
  const {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useNotifications();

  // Auth
  const { status } = useSession();

  // Variables
  const notification = notifications?.pages.flatMap((page) => page.data) || [];
  const isAuthed = status === 'authenticated';
  const isSessionLoading = status === 'loading';
  const isEmpty = notification.length === 0;
  const unreadCount = notification.filter((n) => !n.isRead).length;

  // Functions
  const handleFetchNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn('relative')}>
        <button type="button" aria-label={t('title')}>
          <Bell className="h-6 w-6 dark:text-white" />
          {isAuthed && !isSessionLoading && unreadCount > 0 && (
            <Badge className="absolute -right-2 -top-2 flex size-3.5 items-center justify-center bg-red-500 p-0 text-[.625rem] hover:bg-red-500 dark:bg-red-600 dark:text-white">
              {unreadCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>

      {isAuthed && (
        <DropdownMenuContent className="p-0" aria-label={t('title')}>
          <DropdownMenuLabel className="bg-maroon-700 text-xl font-bold text-white dark:bg-maroon-800">
            <h2 className="text-inherit">
              {t('title')} <span>({notification.length})</span>
            </h2>
          </DropdownMenuLabel>

          <GeneralNotificationsButtons isEmpty={isEmpty} />

          {!isEmpty ? (
            <section
              id="notifications-scroll"
              className="max-h-[400px] overflow-y-auto"
              aria-label={t('title')}
            >
              <InfiniteScroll
                dataLength={notification.length}
                scrollableTarget="notifications-scroll"
                next={handleFetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                  <div className="flex justify-center py-4" aria-live="polite">
                    <Loader
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{t('loadingMore')}</span>
                  </div>
                }
                endMessage={
                  !isLoading && (
                    <p
                      className="py-6 text-center text-sm font-semibold capitalize text-zinc-400"
                      role="status"
                    >
                      {t('seeAll')}
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
                    />
                    <span className="sr-only">{t('loading')}</span>
                  </div>
                ) : (
                  <ul aria-label={t('title')}>
                    {notification.map((noti) => (
                      <li key={noti.id}>
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
