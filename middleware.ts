export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/browse/:path*', '/stack/:path*', '/profile/:path*', '/admin/:path*', '/users/:path*', '/settings/:path*'],
}
