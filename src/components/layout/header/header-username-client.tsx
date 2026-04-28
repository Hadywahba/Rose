'use client';

import LoginPopover from '@/app/[locale]/(auth)/login/_components/login-popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { User } from '@/lib/types/auth';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utility/tailwind-merge';
import { useRouter } from '@/i18n/navigation';
import { signOut } from 'next-auth/react';

interface HeaderUsernameClientProps {
  user: User | null;
}

export default function HeaderUsernameClient({
  user,
}: HeaderUsernameClientProps) {
  // Translation
  const t = useTranslations('header');

  // Hook
  const locale = useLocale();

  // Navigation
  const router = useRouter();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-start text-sm outline-none">
            <span className="text-xs font-normal text-zinc-500">Hello</span>
            <div className="flex items-center gap-1 font-semibold text-red-900 dark:text-softpink-200">
              {user.firstName}{' '}
              <ChevronDown className="h-4 w-4 dark:text-zinc-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push('/profile');
              }}
            >
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push('/allOrders');
              }}
            >
              {t('orders')}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="group relative inline-block">
          <button className="px-4 py-2 font-medium dark:text-white">
            {t('login')}
          </button>

          {/* Hover Login */}
          <div
            className={cn(
              'pointer-events-none absolute top-8 z-50 mt-2 translate-y-2 rounded-md bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100',
              locale === 'ar' ? 'left-0' : 'right-0',
            )}
          >
            <LoginPopover />
          </div>
        </div>
      )}
    </>
  );
}
