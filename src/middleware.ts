import { auth } from '@/auth'
import { authRoutes, publicRoutes } from '@/routes'
import { NextResponse } from 'next/server'

/**
 * Middleware to handle authentication and route authorization.
 *
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - The response object after processing the request.
 */
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedin = !!req.auth

  const isPublic = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Allow access to public routes
  if (isPublic) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from authentication routes (e.g., login page)
  if (isAuthRoute) {
    if (isLoggedin) {
      return NextResponse.redirect(new URL('/members', nextUrl))
    }
    return NextResponse.next()
  }

  // Redirect non-logged-in users trying to access protected routes to the login page
  if (!isPublic && !isLoggedin) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // Allow access to all other routes
  return NextResponse.next()
})

/**
 * Configuration for route matching.
 *
 * @type {Object}
 * @property {Array<string>} matcher - Array of route patterns to match.
 */
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
