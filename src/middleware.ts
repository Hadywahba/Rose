import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// i18n middleware
const intlMiddleware = createIntlMiddleware(routing);

// Auth pages
const authPages = ['/login', '/register', '/forgot-password'];

// Public pages (static + dynamic support)
const publicRoutes = [
  '/home',
  '/products',
  '/occasions',
  '/privacy',
  '/faq',
  '/contact',
  '/terms',
  '/about',
  '/categorie',
];

// Protected pages (actions require auth)
const protectedRoutes = ['/checkout', '/allOrders', '/cart', '/profile' , '/wishlist'];

// Helper: check public routes (supports dynamic routes)
const isPublicPage = (path: string) =>
  publicRoutes.some((route) => path === route || path.startsWith(route + '/'));

// Helper: check protected routes (supports dynamic routes)
const isProtectedPage = (path: string) =>
  protectedRoutes.some(
    (route) => path === route || path.startsWith(route + '/'),
  );

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Run i18n middleware first
  const intlResponse = intlMiddleware(req);

  // Extract locale + clean path
  const [, locale = 'en', ...rest] = pathname.split('/');
  const purePathname = `/${rest.join('/')}`.replace(/\/$/, '') || '/';

  // Get auth token
  const token = await getToken({ req });

  // 1. Public pages → allow access
  if (isPublicPage(purePathname)) {
    return intlResponse;
  }

  // 2. Protected pages → require auth
  if (isProtectedPage(purePathname) && !token) {
    const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 3. Auth pages → redirect logged-in users away
  if (authPages.includes(purePathname) && token) {
    return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl.origin));
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
