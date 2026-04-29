'use client';

import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import ToggleLocal from './toggle-local';
import { Badge } from '@/components/ui/badge';
import ThemeToggleIcon from '../app/theme-toggle';
import HeaderUsernameClient from './header-username-client';
import { User } from '@/lib/types/auth';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import NotificationsList from '@/components/features/notifications/notification-list';
import { cn } from '@/lib/utility/tailwind-merge';
import { useLocalWishlist } from '@/lib/hooks/local-storage/use-local-storage-whishlist';

interface HeaderInfoProps {
  user: User | null;
  cartdata: number;
  wishlistdata: number;
}

export default function HeaderInfo({
  user,
  cartdata,
  wishlistdata,
}: HeaderInfoProps) {
  // Translation
  const locale = useLocale();

  // navigation
  const router = useRouter();

  // Local wishlist (unauthenticated)
  const { list } = useLocalWishlist();

  // Variables
  const numOfCartItems = user ? cartdata : null;
  const numOfWishlost = user ? wishlistdata : list?.length;

  return (
    <div className="flex items-center gap-1">
      <HeaderUsernameClient user={user} />

      <div className="mx-2 h-8 w-[1px] bg-gray-200" />

      <div className="flex items-center gap-4 text-gray-600">
        <button
          onClick={() => {
            router.push('/wishlist', { locale });
          }}
          className="relative hover:text-red-800"
        >
          <Heart className="h-6 w-6 dark:text-white" />
          <Badge
            className={cn(
              (user && (wishlistdata ?? 0) > 0) || (list?.length ?? 0) > 0
                ? 'absolute -right-2 -top-2 flex size-3.5 items-center justify-center bg-red-500 p-0 text-[.625rem] hover:bg-red-500 dark:bg-red-600 dark:text-white'
                : 'hidden',
            )}
          >
            {numOfWishlost}
          </Badge>
        </button>

        <button
          onClick={() => {
            router.push('/cart', { locale });
          }}
          className="relative hover:text-red-800"
        >
          <ShoppingCart className="h-6 w-6 dark:text-white" />
          <Badge
            className={cn(
              user && (numOfCartItems ?? 0) > 0
                ? 'absolute -right-2 -top-2 flex size-3.5 items-center justify-center bg-red-500 p-0 text-[.625rem] hover:bg-red-500 dark:bg-red-600 dark:text-white'
                : 'hidden',
            )}
          >
            {numOfCartItems}
          </Badge>
        </button>

        <button className="relative hover:text-red-800">
          <NotificationsList />
        </button>
      </div>

      <div className="hidden lg:flex">
        <div className="mx-2 h-8 w-[1px] bg-gray-200" />
        <ThemeToggleIcon />
        <div className="mx-2 h-8 w-[1px] bg-gray-200" />
        <ToggleLocal />
      </div>
    </div>
  );
}
