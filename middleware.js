import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Define routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
