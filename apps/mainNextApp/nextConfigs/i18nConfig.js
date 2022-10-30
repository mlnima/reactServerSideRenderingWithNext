const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')

module.exports = locales?.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
        localeDetection: false,
    }
}