export const locales = process.env.NEXT_PUBLIC_LOCALES?.split(' ') || [];
export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

export const i18n = {
    defaultLocale,
    locales,
} as const

export type Locale = (typeof i18n)['locales'][number]