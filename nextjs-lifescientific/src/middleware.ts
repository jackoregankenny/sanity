import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, getDefaultLanguage } from './config/languages'

// Get the list of all language codes
const languageCodes = languages.map(lang => lang.id)

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with a locale
  const pathnameHasLocale = languageCodes.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // If the path includes a locale, let the request continue
    // The page will handle falling back to English if content isn't available
    return
  }

  // Redirect if there is no locale
  const locale = getDefaultLanguage().id
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Match all request paths except for:
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_static (inside /public)
  // - /_vercel (Vercel internals)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)']
} 