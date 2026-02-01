"use client";

import { BrushCleaning, CheckCheck, Loader } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utility/tailwind-merge";
import { useAllNotificationsAsRead } from "@/lib/hooks/notifications/use-all-notifications-as-read";
import { useDeleteAllNotifications } from "@/lib/hooks/notifications/use-delete-all-notifications";

type GeneralNotificationsButtonsProps = {
  isEmpty?: boolean;
};

export default function GeneralNotificationsButtons({
  isEmpty,
}: GeneralNotificationsButtonsProps) {

  // Mutation
  // mark all notifications as read
  const { onMarkAllAsRead, isPending: markReadIsPending } =
    useAllNotificationsAsRead();

  // clear all notifications button
  const { onDeleteAll, isPending: deleteAllIsPending } =
    useDeleteAllNotifications();

  return (
    <div className="drop-down-action flex justify-between items-center gap-6 p-2">
      {/* clear-all-notifications */}
      <button
        onClick={() => onDeleteAll()}
        disabled={markReadIsPending || deleteAllIsPending || isEmpty}
        className={cn(
          isEmpty
            ? "text-[#a1a1aa] dark:text-[#71717a]"
            : "text-[#27272a] dark:text-[#fafafa]",
          "text-sm font-semibold  flex gap-2 items-center"
        )}
      >
        {deleteAllIsPending ? (
          <div className="w-36 flex justify-center">
            <Loader size={18} className="animate-spin" />
          </div>
        ) : (
          <>
            <BrushCleaning size={18} />
            Clear all notifications
          </>
        )}
      </button>
      {/* mark-all-as-read */}
      <button
        disabled={markReadIsPending || deleteAllIsPending || isEmpty}
        onClick={() => onMarkAllAsRead()}
        className={cn(
          isEmpty
            ? "text-[#a1a1aa] dark:text-[#71717a]"
            : "text-[#27272a] dark:text-[#fafafa]",
          "text-sm font-semibold  flex gap-2 items-center"
        )}
      >
        {markReadIsPending ? (
          <div className="w-36 flex justify-center">
            <Loader size={18} className="animate-spin" />
          </div>
        ) : (
          <>
            <CheckCheck size={15} /> Mark all as read
          </>
        )}
      </button>
    </div>
  );
}
