import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // @ts-ignore
  const geo = request.geo

  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-geo-country', geo?.country || 'US')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
