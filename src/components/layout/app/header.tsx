'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  Heart,
  ShoppingCart,
  Home,
  Gift,
  LayoutGrid,
  PartyPopper,
  Headset,
  Info,
  Eye,
  EyeOff,
  Loader,
  Badge,
} from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import ThemeToggleIcon from './theme-toggle';
import ToggleLocale from '@/components/shared/ToggleLocale';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import RememberMe from '@/app/[locale]/(auth)/login/_components/remeber-me';
import SubmitButton from '@/components/features/auth/submit-button';
import { LoginFormFields, loginSchema } from '@/lib/schema/login.schema';
import { cn } from '@/lib/utility/tailwind-merge';
import useLogin from '@/app/[locale]/(auth)/login/_hooks/use-login';
import NotificationsList from '@/components/features/notifications/notification-list';
import { useCart } from '@/lib/hooks/cart/use-cart';
import { useGuestCartContext } from '@/lib/hooks/cart/use-guest-cart-context';

const Header = () => {
  const t = useTranslations('header');
  const a = useTranslations('auth');
  const locale = useLocale();
  const pathname = usePathname();

  // navigation
  const router = useRouter();
  const { login, isPending, error } = useLogin();

  const form = useForm<LoginFormFields>({
    mode: 'all',
    resolver: zodResolver(loginSchema(a)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Querys
  const { data, isLoading, isFetching } = useCart();

  // Hooks
  const { totalItems } = useGuestCartContext();
  // Variables
  const { data: session } = useSession();
  const numOfCartItems = session ? data?.numOfCartItems : totalItems;

  const onSubmit: SubmitHandler<LoginFormFields> = (values) => {
    login({ values, rememberMe });
  };

  const NAV_LINKS = [
    { label: t('home'), href: '/', icon: Home },
    { label: t('products'), href: '/products', icon: Gift },
    { label: t('categories'), href: '/categories', icon: LayoutGrid },
    { label: t('occasion'), href: '/occasions', icon: PartyPopper },
    { label: t('contact'), href: '/contact', icon: Headset },
    { label: t('about'), href: '/about', icon: Info },
  ];
  interface User {
    message?: string;
    token?: string;
    user?: {
      firstName?: string;
      addresses?: Array<{
        city?: string;
      }>;
    };
  }

  interface SessionUser {
    firstName?: string;
    addresses?: Array<{
      city?: string;
    }>;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="w-full bg-white shadow-sm dark:bg-zinc-700">
      {/* Top Row */}
      <div className="mx-auto flex items-center gap-6 px-4 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            width={60}
            height={60}
            alt="Logo"
          />
        </Link>
        {session?.user || user ? (
          <div>
            Deliver to:{' '}
            {(session?.user as SessionUser)?.addresses?.[0]?.city ||
              user?.user?.addresses?.[0]?.city}
          </div>
        ) : null}
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder={t('search')} className="h-12 w-full pl-10" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Auth */}
          {session?.user || user ? (
            <div className="group relative">
              <p className="cursor-pointer font-medium dark:text-white">
                Hello {session?.user.firstName || user?.user?.firstName}
              </p>

              <div className="invisible absolute right-0 top-full z-30 mt-2 w-40 rounded-md bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                <Link
                  className="block px-4 py-2 hover:bg-gray-100"
                  href="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="block px-4 py-2 hover:bg-gray-100"
                  href="/orders"
                >
                  Orders
                </Link>
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="group relative">
              <button className="px-4 py-2 font-medium dark:text-white">
                {t('login')}
              </button>

              {/* Hover Login */}
              <div className="invisible absolute right-0 top-full z-30 mt-2 w-96 overflow-hidden rounded-md bg-white opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <Tabs defaultValue="login">
                  <TabsList className="w-full">
                    <TabsTrigger value="login" asChild className="w-1/2">
                      <Link href="/login">{t('login')}</Link>
                    </TabsTrigger>
                    <TabsTrigger value="register" asChild className="w-1/2">
                      <Link href="/register">{t('register')}</Link>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 p-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{a('login.email')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="user@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{a('login.password')}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                className={cn(
                                  'absolute top-1/2 -translate-y-1/2 hover:!bg-transparent',
                                  locale === 'ar'
                                    ? 'left-[-25px]'
                                    : 'right-[-25px]',
                                )}
                                onClick={() => setShowPassword((p) => !p)}
                              >
                                {showPassword ? <EyeOff /> : <Eye />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/forgot-password"
                      className="mt-2 text-right text-sm font-semibold text-maroon-700 dark:text-softpink-300"
                    >
                      {a('login.forget-password')}
                    </Link>
                    <RememberMe checked={rememberMe} onChange={setRememberMe} />

                    <SubmitButton
                      error={error}
                      isSubmitting={form.formState.isSubmitting}
                      isValid={form.formState.isValid}
                      isPending={isPending}
                      text="login.submit"
                      loading="login.loading"
                    />
                  </form>
                </Form>
              </div>
            </div>
          )}

          {/* Icons */}
          <Heart />
          {/* Notifications */}
          <NotificationsList />
          {/* Cart-Badge */}
          <button
            className="relative hover:text-red-800"
            // navigate to cart page
            onClick={() => {
              router.push('/cart', { locale });
            }}
          >
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-red-600 p-0 hover:bg-red-600">
              {isLoading || isFetching ? (
                <Loader size={12} className="animate-spin" />
              ) : (
                numOfCartItems
              )}
            </Badge>
          </button>

          <ThemeToggleIcon />
          <ToggleLocale />
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bg-maroon-700 text-white">
        <div className="mx-auto flex justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 py-3',
                pathname === link.href && 'border-b-2 border-white',
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
