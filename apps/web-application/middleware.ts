
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    )
//@ts-ignore
    const locale = matchLocale(languages, locales, i18n.defaultLocale)

    return locale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // // If you have one
    // if (
    //   [
    //     '/manifest.json',
    //     '/favicon.ico',
    //     // Your other files in `public`
    //   ].includes(pathname)
    // )
    //   return

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(

        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        const params = request?.nextUrl?.searchParams;


        // const params = request.url.searchParams;
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.rewrite(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${params ? `?${params}` : ""}`,
                request.url
            )
        )
        // return NextResponse.rewrite(
        //     new URL(
        //         `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        //         request.url
        //     )
        // )
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|asset|fonts|public).*)'],
}
















// import { NextRequest, NextResponse } from 'next/server'
// import acceptLanguage from 'accept-language'
// import {locales,defaultLocale} from "./i18n";
// import { match } from '@formatjs/intl-localematcher'
// import Negotiator from 'negotiator';
// import i18n from "./i18n";
// import languageDetectorFromURL from "custom-util/dist/src/url-util/languageDetectorFromURL";

// acceptLanguage.languages(locales)
//
// export const config = {
//     matcher: [
//         // '/((?!_next|api|favicon.ico).*)',
//         // '/((?!api|_next/static|_next/image|favicon.ico).*)',
//         // '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
//         '/',
//         // '/((?!api|_next/static|_next/image|favicon.ico).*)',
//
//     ],
// }
//
// const cookieName = 'i18next'
//
// export function middleware(req: NextRequest) {
//
//
//
//     let lng
//     //@ts-ignore
//     if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
//     if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
//     if (!lng) lng = defaultLocale
//
//     // Redirect if lng in path is not supported
//     if (
//         !locales.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//         !req.nextUrl.pathname.startsWith('/_next')
//     ) {
//         console.log('redirect => ',`/${lng}${req.nextUrl.pathname}`)
//         //@ts-ignore
//         return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
//     }
//
//     if (req.headers.has('referer')) {
//         //@ts-ignore
//         const refererUrl = new URL(req.headers.get('referer'))
//         const lngInReferer = locales.find((l) => refererUrl.pathname.startsWith(`/${l}`))
//         const response = NextResponse.next()
//         if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
//         return response
//     }
//
//     return NextResponse.next()
// }




// function getLocale(request: NextRequest): string | undefined {
//     // // Negotiator expects plain object so we need to transform headers
//     // const negotiatorHeaders: Record<string, string> = {}
//     // request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
//     //
//     // // Use negotiator and intl-localematcher to get best locale
//     // let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
//     // // @ts-ignore locales are readonly
//     // const locales: string[] = i18n.locales
//     // return matchLocale(languages, locales, i18n.defaultLocale as string)
//     const headers = new Headers(request.headers)
//     const acceptLanguage = headers.get("accept-language")
//     if (acceptLanguage) {
//         headers.set('accept-language', acceptLanguage.replaceAll("_", "-"))
//     }
//
//     const headersObject = Object.fromEntries(headers.entries());
//     const languages = new Negotiator({ headers: headersObject }).languages();
//     return match(languages, i18n.locales, i18n.defaultLocale as string);
// }
//
//
//
// export function middleware(request: NextRequest) {
//     console.log('middleware Start Log=> ','____________________________')
//     // console.log('request.nextUrl=> ',request.nextUrl)
//     const userRequestedLanguage = languageDetectorFromURL(request.nextUrl)
//     console.log('userRequestedLanguage=> ',userRequestedLanguage)
//     console.log('request.nextUrl.pathname=> ',request.nextUrl.pathname)
//
//     // const userSupportingLanguage = getLocale(request)
//     // console.log('userRequestedLanguage=> ',userRequestedLanguage)
//     // console.log('userSupportingLanguage=> ',userSupportingLanguage)
//
//     if (!userRequestedLanguage){
//
//         console.log('Rewriting to default locale=>',`/${i18n.defaultLocale}`)
//         NextResponse.rewrite(new URL(`/${i18n.defaultLocale}`,request.nextUrl))
//     }
//     console.log('middleware End Log=> ','____________________________')
//     // const pathnameIsMissingLocale = i18n.locales.every(
//     //     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//     // )
//
//     // console.log('Middleware pathname=> ',pathname)
//     // const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl);
//
//     // e.g. incoming request is /products
//     // The new URL is now /en/products
//     // return NextResponse.rewrite(newUrl)
//     // return
// }





// return NextResponse.rewrite(request.nextUrl);