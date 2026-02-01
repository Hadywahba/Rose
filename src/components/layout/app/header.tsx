'use client';

import React from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
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

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Products', href: '/products', icon: Gift },
  { label: 'Categories', href: '/categories', icon: LayoutGrid },
  { label: 'Occasions', href: '/occasions', icon: PartyPopper },
  { label: 'Contact', href: '/contact', icon: Headset },
  { label: 'About', href: '/about', icon: Info },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white shadow-sm">
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
            <span className="text-gray-400">Deliver to:</span>
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
            placeholder="What awesome gift are you looking for?"
            className="h-12 w-full rounded-lg border-gray-200 pl-10 focus-visible:ring-red-800"
          />
        </div>

        {/* User Actions & Icons */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col items-start text-sm outline-none">
              <span className="text-xs text-gray-400">Hello</span>
              <div className="flex items-center gap-1 font-semibold text-red-900">
                Jonathan <ChevronDown className="h-4 w-4" />
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
              <Heart className="h-6 w-6" />
            </button>

            <button className="relative hover:text-red-800">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-red-600 p-0 hover:bg-red-600">
                8
              </Badge>
            </button>

            <button className="relative hover:text-red-800">
              <Bell className="h-6 w-6" />
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-red-600 p-0 hover:bg-red-600">
                8
              </Badge>
            </button>
          </div>

          <div className="mx-2 h-8 w-[1px] bg-gray-200" />

          <button className="text-sm font-medium hover:text-red-800">
            العربية
          </button>
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
