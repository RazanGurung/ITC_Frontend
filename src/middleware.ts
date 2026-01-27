import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromCookie } from '@/lib/auth';

// ============================================
// Protected Routes Configuration
// ============================================

const protectedRoutes = [
  '/admin/dashboard',
  '/admin/posts',
  '/admin/events',
  '/admin/gallery',
  '/admin/contacts',
];

const publicAdminRoutes = [
  '/admin/login',
];

// ============================================
// Middleware Function
// ============================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublicAdminRoute = publicAdminRoutes.some((route) => pathname === route);

  // If not an admin route, continue
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Get authentication token from cookie
  const cookieHeader = request.headers.get('cookie');
  const token = getTokenFromCookie(cookieHeader || undefined);

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (token && isPublicAdminRoute) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing /admin directly, redirect to dashboard or login
  if (pathname === '/admin' || pathname === '/admin/') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// ============================================
// Middleware Configuration
// ============================================

export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
  ],
};
