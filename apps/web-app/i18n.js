const locales = process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [];
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
const domains = !process.env.NEXT_PUBLIC_DOMAINS ? {} :
    process.env.NEXT_PUBLIC_DOMAINS.split(' ').map((domain, index) => {
        return {
            domain,
            defaultLocale: locales[index],
        }
    })

console.log(domains)
module.exports = {
    locales,
    defaultLocale,
    ...domains,
    logger: () => null,
    logBuild: false,
    // localeDetection: false,
    // loadLocaleFrom: (lang, ns) =>
    //     import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
    pages: {
        "*": ['common', 'customTranslation'],
        // "/": ["home", "example"],
        "/profile": ["profile"],
        "/profile/edit": ["profile"]
    }
};