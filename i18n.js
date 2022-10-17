module.exports =  {
    locales: process.env.NEXT_PUBLIC_LOCALS.split(' '),
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
    logger:()=>null,
    logBuild: false,
    localeDetection: false,
    // loadLocaleFrom: (lang, ns) =>
    //     import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
    pages: {
        "*": ['common','customTranslation'],
        // "/": ["home", "example"],
        "/profile": ["profile"],
        "/profile/edit": ["profile"]
    }
};