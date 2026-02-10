import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  let cookies = request.cookies.get('accessToken');
  if (cookies && (request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname.startsWith('/forgot-password') || request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

//   if (!cookies && (request.nextUrl.pathname.startsWith('/dashboard'))) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/forgot-password/:path*',
  ],
}