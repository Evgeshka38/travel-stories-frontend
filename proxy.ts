import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { refreshSessionServer } from '@/lib/api/serverApi';

const publicRoutes = ['/auth/login', '/auth/register'];

function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname);
}

function isPrivateRoute(pathname: string) {
  const isProfileRoute =
    pathname === '/profile' || pathname.startsWith('/profile/');

  const isCreateStoryRoute = pathname === '/stories/create';
  const isEditStoryRoute = /^\/stories\/[^/]+\/edit$/.test(pathname);

  return isProfileRoute || isCreateStoryRoute || isEditStoryRoute;
}

function mergeCookieHeader(
  request: NextRequest,
  setCookieHeaders: string[],
): string {
  const cookieMap = new Map(
    request.cookies.getAll().map(({ name, value }) => [name, value]),
  );

  for (const setCookie of setCookieHeaders) {
    const [cookiePair] = setCookie.split(';');
    const separatorIndex = cookiePair.indexOf('=');

    if (separatorIndex === -1) continue;

    const name = cookiePair.slice(0, separatorIndex).trim();
    const value = cookiePair.slice(separatorIndex + 1).trim();

    if (name) cookieMap.set(name, value);
  }

  return Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
}

function applySetCookieHeaders(response: NextResponse, setCookieHeaders: string[]) {
  for (const setCookie of setCookieHeaders) {
    response.headers.append('set-cookie', setCookie);
  }

  return response;
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  response.cookies.delete('sessionId');
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoute = isPublicRoute(pathname);
  const privateRoute = isPrivateRoute(pathname);

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const sessionId = request.cookies.get('sessionId')?.value;

  const hasAccessSession = Boolean(accessToken && sessionId);

  if (hasAccessSession) {
    if (publicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken && sessionId) {
    try {
      const setCookieHeaders = await refreshSessionServer(
        request.headers.get('cookie') ?? '',
      );

      if (setCookieHeaders.length > 0) {
        if (publicRoute) {
          const response = NextResponse.redirect(new URL('/', request.url));
          return applySetCookieHeaders(response, setCookieHeaders);
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set(
          'cookie',
          mergeCookieHeader(request, setCookieHeaders),
        );

        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        return applySetCookieHeaders(response, setCookieHeaders);
      }
    } catch {
      if (privateRoute) {
        const response = NextResponse.redirect(
          new URL('/auth/login', request.url),
        );
        return clearAuthCookies(response);
      }

      return clearAuthCookies(NextResponse.next());
    }
  }

  if (privateRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
