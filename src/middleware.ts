import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


// Constants
const authPages = new Set(['/login', '/register', '/forgot-password'])
// Middleware
export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    // Auth
    const token = await getToken({ req });
    const purePathname = pathname.replace(/^\/(en|ar)/, '') || '/';
    const isAuthPage = authPages.has(purePathname);
    // Protected Pages Logic
    if (!isAuthPage) {
        if (token) return NextResponse.next();
        // Redirect unauthenticated users to login
        const locale = pathname.split('/')[1] || 'en';
        const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
        redirectUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(redirectUrl);
    }
    // Redirect authenticated users away from auth pages
    if (token) {
        const locale = pathname.split('/')[1] || 'en';
        return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl.origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}