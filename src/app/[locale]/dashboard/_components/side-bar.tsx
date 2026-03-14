'use client';

import Image from 'next/image';
import logo from '../../../../../public/assets/images/logo.png';
import { Link, usePathname } from '@/i18n/navigation';
import {
  CalendarHeart,
  ClipboardList,
  Flower,
  LayoutDashboard,
  Package,
  X,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import UserMenu from './user-menu';
import { useMemo } from 'react';
import { cn } from '@/lib/utility/tailwind-merge';

type NavLinksProps = {
  href: string;
  lable: string;
  icon: React.ReactNode;
};

type SideBarProps = {
  className?: string;
  variant?: 'desktop' | 'mobile';
  isOpen?: boolean;
  onClose?: () => void;
  topOffsetClass?: string;
};

export default function SideBar({
  className,
  variant = 'desktop',
  isOpen = false,
  onClose,
  topOffsetClass = '',
}: SideBarProps) {
  //Translations
  const t = useTranslations();
  const locale = useLocale();

  // Navigation
  const pathName = usePathname();

  //Variables
  const navLinks: NavLinksProps[] = useMemo(() => {
    return [
      { href: '/dashboard', lable: t('overview'), icon: <LayoutDashboard /> },
      {
        href: '/dashboard/categories',
        lable: t('categories'),
        icon: <ClipboardList />,
      },
      {
        href: '/dashboard/occasions',
        lable: t('occasion'),
        icon: <CalendarHeart />,
      },
      {
        href: '/dashboard/products',
        lable: t('dashboard-products'),
        icon: <Package />,
      },
    ];
  }, [t]);

  // ===== Shared Sidebar UI =====
  const SidebarContent = (
    <div className="relative flex h-full w-full flex-col items-center space-y-3 p-3">
      {/* logo */}
      <div className="logo relative">
        <Image src={logo} alt="rose-app" width={100} height={0} />
      </div>

      {/* navigate-to website */}
      <Link
        className="flex w-full items-center gap-2 rounded-md bg-maroon-500 px-3 py-2 text-white transition-colors duration-300 hover:bg-maroon-600"
        href="/"
        locale={locale}
        onClick={onClose}
      >
        <Flower size={25} /> <span>{t('preview-website')}</span>
      </Link>

      {/* side-bar-links */}
      <ul className="flex w-full flex-col gap-3">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={cn(
                pathName === link.href
                  ? 'bg-maroon-50 text-maroon-600 dark:bg-maroon-300 dark:text-maroon-800'
                  : 'text-zinc-800 dark:text-zinc-50',
                'flex items-center gap-2 rounded-md px-3 py-2 font-semibold',
              )}
              href={link.href}
              locale={locale}
              onClick={onClose}
            >
              {link.icon} <span>{link.lable}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* user-menu */}
      <div className="mt-auto w-full">
        <UserMenu />
      </div>
    </div>
  );

  // ===== Desktop Fixed Sidebar =====
  if (variant === 'desktop') {
    return (
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 w-72',
          topOffsetClass,
          'bg-white dark:bg-zinc-800',
          'border-e border-black/10 dark:border-white/10',
          className,
        )}
      >
        {SidebarContent}
      </aside>
    );
  }

  // ===== Mobile Drawer Sidebar =====
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 md:hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        className,
      )}
      aria-hidden={!isOpen}
    >
      {/* overlay */}
      <button
        type="button"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        aria-label="Close sidebar overlay"
      />

      {/* drawer */}
      <aside
        className={cn(
          'absolute inset-y-0 start-0 w-72',
          topOffsetClass,
          'bg-white dark:bg-zinc-800',
          'border-e border-black/10 dark:border-white/10',
          'transform transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* header row with close */}
        <div className="flex items-center justify-end p-3">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-xl',
              'border border-black/10 bg-white text-zinc-800 shadow-sm',
              'transition hover:bg-zinc-50',
              'dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700',
            )}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {SidebarContent}
      </aside>
    </div>
  );
}
