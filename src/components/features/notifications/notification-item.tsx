'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReadSingleNotification } from '@/lib/hooks/notifications/use-read-single-notification';
import { useSingleNotificationAsRead } from '@/lib/hooks/notifications/use-single-notification-as-read';
import { Notification } from '@/lib/types/notification';
import { cn } from '@/lib/utility/tailwind-merge';
import { Check, MoreHorizontalIcon, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  // Translation
  const t = useTranslations('notifications');

  const { onMarkAsRead, isPending } = useSingleNotificationAsRead();
  const { readSingleMessage, isPending: isDeletePending } =
    useReadSingleNotification();

  const isActionsDisabled = isPending || isDeletePending;
  const isMarkAsReadDisabled = notification.isRead || isActionsDisabled;

  const handleTriggerPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
  };

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleMarkAsReadSelect = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    onMarkAsRead(notification.id);
  };

  const handleDeleteSelect = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    readSingleMessage(notification.id);
  };

  return (
    <article
      aria-label="Notification item"
      className={cn(
        notification.isRead
          ? 'bg-zinc-200 dark:bg-zinc-800'
          : 'dark:bg-zinc-900',
        'flex max-w-[21rem] items-start justify-between rounded-none border-b border-t border-zinc-300 px-2 py-2 dark:border-zinc-600',
      )}
    >
      <header className="notification-content max-w-[80%]">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-50">
          {notification.title}
        </h3>
        <p className="line-clamp-3 text-sm text-zinc-500 dark:text-zinc-400">
          {notification.message}
        </p>
      </header>

      <nav aria-label={t('openMenu')}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={t('openMenu')}
              className="border-0 outline-none focus:outline-none"
              onPointerDown={handleTriggerPointerDown}
              onClick={handleTriggerClick}
            >
              <MoreHorizontalIcon aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuItem
              disabled={isMarkAsReadDisabled}
              onSelect={handleMarkAsReadSelect}
              className={cn(
                notification.isRead ? 'opacity-60' : '',
                'flex cursor-pointer items-center gap-2',
              )}
              aria-disabled={isMarkAsReadDisabled}
            >
              <Check className="size-4" aria-hidden="true" />
              <span>{t('markAsRead')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isActionsDisabled}
              onSelect={handleDeleteSelect}
              className="flex cursor-pointer items-center gap-2"
              aria-disabled={isActionsDisabled}
            >
              <Trash2
                size={16}
                className="text-maroon-600 dark:text-softpink-400"
                aria-hidden="true"
              />
              <span>{t('delete')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </article>
  );
}
