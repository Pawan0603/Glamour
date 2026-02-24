import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  let cookies = request.cookies.get('accessToken');
  const token = cookies?.value;

  if (cookies && (request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname.startsWith('/forgot-password') || request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if(token){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role;

    if(userRole !== 'owner' && request.nextUrl.pathname.startsWith('/owner')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if(userRole !== 'customer' && request.nextUrl.pathname.startsWith('/register-salon')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/forgot-password/:path*',
    '/owner/:path*',
    '/register-salon/:path*',
  ],
}