import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@i18nConfig';
import { cookies } from 'next/headers';
import { decryptJWT } from '@lib/session';
import initialSettings from './public/initialSettings.json'

const getLocaleFromUrl = (request: NextRequest) => {
  const newUrl = new URL(request.url);
  const locale = newUrl.pathname.split('/')[1]; // Get the first parameter of the pathname
  return i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
};

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const params = request?.nextUrl?.searchParams;


  if (pathname === '/favicon.ico'){
    if (initialSettings?.headDataSettings?.favIconUrl){
      return NextResponse.rewrite(
        new URL(
          initialSettings?.headDataSettings?.favIconUrl || '/favicon.ico',
          request.url,
        ),
      );
    }else {
      return NextResponse.next();
    }
  }



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
    '/((?!api|_next/static|_next/image|asset|fonts|public|sitemap|robots.txt|manifest.webmanifest).*)',
  ],
};

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|asset|fonts|public|sitemap|robots.txt|manifest.webmanifest).*)',
//   ],
// };
