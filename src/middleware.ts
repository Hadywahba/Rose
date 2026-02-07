import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware(routing);

// Auth pages
const authPages = new Set(['/login', '/register', '/forgot-password']);

// Pages that anyone can access
const publicPages = new Set(['/home', '/products']);

// Pages that require authentication to perform actions (like add/edit)
const protectedPages = new Set(['/product/add', '/product/edit']);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // First, handle i18n routing
  const intlResponse = intlMiddleware(req);

  // Extract locale and pure path
  const [, locale = 'en', ...rest] = pathname.split('/');
  const purePathname = `/${rest.join('/')}`.replace(/\/$/, '') || '/';

  // Get authentication token
  const token = await getToken({ req });

  // Allow public pages
  if (publicPages.has(purePathname)) {
    return intlResponse;
  }

  // Protected pages
  if (protectedPages.has(purePathname) && !token) {
    // Redirect unauthenticated users to login
    const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users away from auth pages
  if (authPages.has(purePathname) && token) {
    return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl.origin));
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
