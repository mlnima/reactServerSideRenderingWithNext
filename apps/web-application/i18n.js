const locales = process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [];
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCAL;

//Cannot read properties of undefined (reading
module.exports = {
    defaultLocale,
    locales,
    logger: () => null,
    logBuild: false,
    // localeDetection: false,
    pages: {
        "*": ['common', 'customTranslation'],
        "/[lang]/profile": ["profile"],
        "/[lang]/user": ["profile"],
        // "rgx:^/[lang]/post": ["event"],
        "/[lang]/profile/edit": ["profile"]
    },
    // "loadLocaleFrom": (lang, ns) =>{
    //     console.log('loadLocaleFrom=> ',lang, ns)
    //     // You can use a dynamic import, fetch, whatever. You should
    //     // return a Promise with the JSON file.
    //   return   import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
    // }

}

