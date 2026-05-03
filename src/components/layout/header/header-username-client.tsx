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
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { signOut } from 'next-auth/react';
import { useRef, useState, useCallback } from 'react';

interface HeaderUsernameClientProps {
  user: User | null;
}

export default function HeaderUsernameClient({ user }: HeaderUsernameClientProps) {
  const t = useTranslations('header');
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const calcPosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const popoverWidth = 320; // w-80
    const viewportWidth = window.innerWidth;
    const padding = 8;

    // Default: align right edge of popover to right edge of button
    let left = rect.right - popoverWidth;

    // If it goes off the left edge, pin to left padding
    if (left < padding) left = padding;

    // If it goes off the right edge, pin to right padding
    if (left + popoverWidth > viewportWidth - padding) {
      left = viewportWidth - popoverWidth - padding;
    }

    setPopoverStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left,
      width: popoverWidth,
    });
  }, []);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    calcPosition();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-start text-sm outline-none">
            <span className="text-xs font-normal text-zinc-500">Hello</span>
            <div className="flex items-center gap-1 font-semibold text-red-900 dark:text-softpink-200">
              {user.firstName}
              <ChevronDown className="h-4 w-4 dark:text-zinc-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/allOrders')}>
              {t('orders')}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div
          ref={wrapperRef}
          className="relative inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="px-4 py-2 font-medium dark:text-white">
            {t('login')}
          </button>

          {open && (
            <div
              style={popoverStyle}
              className="z-50 rounded-xl bg-white shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <LoginPopover />
            </div>
          )}
        </div>
      )}
    </>
  );
}
