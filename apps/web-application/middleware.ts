import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@i18nConfig';
import { cookies } from 'next/headers';
import { decryptJWT } from '@lib/session';

const getLocaleFromUrl = (request: NextRequest) => {
  const newUrl = new URL(request.url);
  const locale = newUrl.pathname.split('/')[1]; // Get the first parameter of the pathname
  return i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
};

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const params = request?.nextUrl?.searchParams;


  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathname.startsWith('/admin')) {
    const sessionCookie = (await cookies()).get('session')?.value;
    const sessionData = sessionCookie ? await decryptJWT(sessionCookie) : null;

    if (sessionData?.role === 'administrator') {
      return NextResponse.next();
    }
  }


  if (pathname === '/manifest.json') {
    return NextResponse.rewrite(
      new URL(
        `/manifest.webmanifest`,
        request.url,
      ),
    );
  }

  if (pathnameIsMissingLocale) {
    const locale = getLocaleFromUrl(request);
    return NextResponse.rewrite(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${params ? `?${params}` : ''}`,
        request.url,
      ),
    );
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|asset|fonts|public|sitemap|robots.txt|manifest.webmanifest).*)',
  ],
};

//matcher: ['/((?!api|_next/static|_next/image|favicon.ico|asset|fonts|public|sitemap|robots.txt|manifest.webmanifest).*)'],
// if (pathname.startsWith('/admin')) {
//   return NextResponse.rewrite(
//     new URL(request.url),
//   )
// }


//|manifest.webmanifest

// |manifest.json |manifest.webmanifest

// //This function detect accepted language and return the best one but is not in use due to the bug
// function getLocale(request: NextRequest): string | undefined {
//     // Negotiator expects plain object so we need to transform headers
//     const negotiatorHeaders: Record<string, string> = {}
//     request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
//
//
//     // @ts-ignore locales are readonly
//     const locales: string[] = i18n.locales
//
//     // Use negotiator and intl-localematcher to get best locale
//     let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
//         locales
//     )
// //@ts-ignore
//     const locale = matchLocale(languages, locales, i18n.defaultLocale)
//     console.log('middleware locale=> ',locale)
//     return locale
// }