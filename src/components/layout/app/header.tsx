'use client';

import React from 'react';
import {
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  Bell,
  Home,
  Gift,
  LayoutGrid,
  PartyPopper,
  Headset,
  Info,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggleIcon from './theme-toggle';
import LoginForm from '@/app/[locale]/(auth)/login/_components/login-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import ToggleLocale from '@/components/shared/ToggleLocale';
// import { useSession } from 'next-auth/react';


const Header = () => {
  const t =useTranslations('header');
const NAV_LINKS = [
  { label: t('home'), href: '/', icon: Home },
  { label: t('products'), href: '/products', icon: Gift },
  { label: t('categories'), href: '/categories', icon: LayoutGrid },
  { label: t('occasion'), href: '/occasions', icon: PartyPopper },
  { label: t('contact'), href: '/contact', icon: Headset },
  { label: t('about'), href: '/about', icon: Info },
];
  const pathname = usePathname();
  // const { data: session, status } = useSession(); // TODO: add auth

  return (
    <header className="w-full bg-white shadow-sm dark:bg-zinc-700">
      {/* --- Top Row --- */}
      <div className="mx-auto flex items-center gap-6 px-4 py-4">
        {/* Logo & Delivery */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/assets/images/logo.png"
              width={60}
              height={60}
              alt="Logo"
            />
          </Link>

          <div className="hidden flex-col border-l border-gray-200 pl-6 text-sm lg:flex">
            <span className="text-gray-400">{t('deliver to')}</span>
            <div className="flex items-center gap-1 font-semibold text-red-800">
              <MapPin className="h-4 w-4" />
              <span>Cairo</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t('search')}
            className="h-12 w-full rounded-lg border-gray-200 pl-10 focus-visible:ring-red-800"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col items-start text-sm outline-none">
              <div className="relative">
                {/* {session?.user ? (
        <p className="font-medium">
          Hello {session.user.name}
        </p> */}
                {sessionStorage.getItem('user') ? (
                  <p className="font-medium">
                    Hello{' '}
                    {JSON.parse(sessionStorage.getItem('user') || '{}').name}
                  </p>
                ) : (
                  <div className="group relative">
                    <button className="px-4 py-2 font-medium dark:text-zinc-50">{t('login')}</button>

                    {/* component for hover */}
                    <div className="invisible absolute right-0 top-full bg-white z-30 mt-2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:!opacity-100">
                      <div className="z-30 w-96 rounded-md bg-white p-4 shadow-lg">
                        <Tabs defaultValue="account" className="w-full pb-4">
                          <TabsList>
                            <TabsTrigger value="account">
                              <Link href="/login">{t('login')}</Link>
                            </TabsTrigger>
                            <TabsTrigger value="password">
                              <Link href="/register">{t('register')}</Link>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>

                        <LoginForm />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mx-2 h-8 w-[1px] bg-gray-200" />

          <div className="flex items-center gap-5 text-gray-600">
            <button className="hover:text-red-800">
              <Heart className="h-6 w-6 dark:text-zinc-50" />
            </button>

            <button className="relative hover:text-red-800">
              <ShoppingCart className="h-6 w-6 dark:text-zinc-50" />
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-red-600 p-0 hover:bg-red-600">
                8
              </Badge>
            </button>

            <button className="relative hover:text-red-800">
              <Bell className="h-6 w-6 dark:text-zinc-50" />
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-red-600 p-0 hover:bg-red-600">
                8
              </Badge>
            </button>
          </div>
          <ThemeToggleIcon />
          <ToggleLocale />
        </div>
      </div>

      {/* --- Bottom Navigation Row --- */}
      <nav className="no-scrollbar w-full overflow-x-auto bg-maroon-700 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={<link.icon size={18} />}
              active={pathname === link.href}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

// Sub-component for Nav Links
const NavLink = ({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className={`relative flex items-center gap-2 whitespace-nowrap px-1 py-3 text-sm font-medium transition-all ${active ? 'text-white' : 'text-white/70 hover:text-white'} `}
  >
    {icon}
    {label}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-sm bg-white" />
    )}
  </Link>
);

export default Header;
