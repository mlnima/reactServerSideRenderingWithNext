const locales = process.env.NEXT_PUBLIC_LOCALES?.split(' ') || [];
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

const domains = !process.env.NEXT_PUBLIC_DOMAINS ? {} :
    process.env.NEXT_PUBLIC_DOMAINS.split(' ').map((domain, index) => {
        return {
            domain,
            defaultLocale: locales[index],
        }
    })


module.exports = {
    locales,
    defaultLocale,
    ...domains,
    logger: () => null,
    logBuild: false,
    // localeDetection: false,
    pages: {
        "*": ['common', 'customTranslation'],
        "/profile": ["profile"],
        "/user": ["profile"],
        "rgx:^/post": ["event"],
        "/profile/edit": ["profile"]
    }
};