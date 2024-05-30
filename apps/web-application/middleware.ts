import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@i18nConfig'

const getLocaleFromUrl = (request: NextRequest,) => {
    const newUrl = new URL(request.url);
    const locale = newUrl.pathname.split('/')[1]; // Get the first parameter of the pathname
    return i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
}

export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocaleFromUrl(request)
        const params = request?.nextUrl?.searchParams;

        return NextResponse.rewrite(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${params ? `?${params}` : ""}`,
                request.url
            )
        )
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|asset|fonts|public|sitemap).*)'],
}


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