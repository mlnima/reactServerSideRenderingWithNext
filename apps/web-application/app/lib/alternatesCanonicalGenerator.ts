type LanguageReducer = {
    [key: string]: string;
};

export class AlternatesGenerators {
    baseUrlPath: string;
    defaultLocale: string;
    locales: string[];

    constructor() {
        this.baseUrlPath = process.env.NEXT_PUBLIC_PRODUCTION_URL;
        this.defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
        this.locales = process.env.NEXT_PUBLIC_LOCALES
            // ?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
            ?.split(' ');
    }

    alternateLanguagesCorrector(lang: string) {
        return this.locales.filter((locale: string) => locale !== lang);
    }

    alternatePathReducer(lang: string, path: string = '') {
        const languagesToRender =
            lang === this.defaultLocale
                ? this.alternateLanguagesCorrector(lang)
                : [...this.alternateLanguagesCorrector(lang), 'x-default'];

        return languagesToRender.reduce((finalValue: LanguageReducer, currentLocale: string) => {
            if (currentLocale !== this.defaultLocale) {
                finalValue[currentLocale] =
                    `/${currentLocale === 'x-default' ? '' : currentLocale}${path}`;
            }
            return finalValue;
        }, {});
    }

    baseCanonicalPathGenerator(lang: string) {
        return `/${lang === this.defaultLocale || lang === 'x-default' ? '' : lang}`;
    }

    // pages
    homePage(lang: string) {
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}`,
            languages: this.alternatePathReducer(lang),
        };
    }

    postPage(lang: string, identifier: string, postType: string) {
        const targetPath = `/post/${postType}/${identifier}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    actorPage(lang: string, actorId: string) {
        const targetPath = `/actor/${actorId}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    metaPage(lang: string, metaType: string, metaId: string) {
        const targetPath = `/${metaType}/${metaId}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    metasPage(lang: string, metaType: string) {
        const targetPath = `/${metaType}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    chatroomPage(lang: string, chatroomId: string) {
        const targetPath = `/chatroom/${chatroomId}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    staticPage(lang: string, pageName: string) {
        const targetPath = `/${pageName}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    customPage(lang: string, pageName: string) {
        const targetPath = `/page/${pageName}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }

    searchPage(lang: string, keyword: string) {
        const targetPath = `/search/${keyword}`;
        return {
            canonical: `${this.baseCanonicalPathGenerator(lang)}${targetPath}`,
            languages: this.alternatePathReducer(lang, targetPath),
        };
    }
}
