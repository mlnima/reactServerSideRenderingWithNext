import {getTextDataWithTranslation, textContentReplacer} from "@_variables/_variables";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {
    _homePageCanonicalUrlGenerator,
    _metasCanonicalUrlGenerator
} from "@_variables/clientVariables/_canonicalUrlGenerators";

const _firstRequestHeadDataSetter = (context, page: string, setHeadData: boolean, identity: any) => {

    if (page?.match('search|tags|categories|actors|home|profile|posts|chatroom|messenger|login|register') && setHeadData) {
        const title = page && page?.match('search|tags|categories|actors') ?
            textContentReplacer(
                getTextDataWithTranslation(context.locale, `${page}PageTitle`, identity)
                //@ts-ignore
                + ` | ${identity?.siteName}`,
                {
                    name: page === 'search' ?
                        `${capitalizeFirstLetter(context.query?.keyword)} ` :
                        ` ${capitalizeFirstLetter(page)} `
                }
            )
            : getTextDataWithTranslation(context.locale, 'title', identity)

        const description = page && page?.match('search|tags|categories|actors') ?
            textContentReplacer(
                getTextDataWithTranslation(context.locale, `${page}PageDescription`, identity)
                //@ts-ignore
                + `| ${identity?.siteName}`,
                {
                    name: page === 'search' ?
                        `${capitalizeFirstLetter(context.query?.keyword)}` :
                        `${capitalizeFirstLetter(page)}`
                }
            )
            : getTextDataWithTranslation(context.locale, 'description', identity)

        const isMetaPageRegex = /categories|tags|actors/g

        const canonicalUrl = isMetaPageRegex.test(page) ?
            _metasCanonicalUrlGenerator(page, context.locale, context.query.page) :
            _homePageCanonicalUrlGenerator(context.locale)

        return {
            title: title || null,
            description: description?.substring(0, 155) || null,
            keywords: [(page !== 'home' ? page : ''), ...(getTextDataWithTranslation(context.locale, 'keywords', identity) || [])],
            themeColor: identity?.themeColor || '#000',
            canonicalUrl,
            //@ts-ignore
            favIcon: identity?.favIcon || '/static/images/favIcon/favicon.png',
            //@ts-ignore
            customScriptsAsString: identity?.customScriptsAsString || '',
            //@ts-ignore
            rtaContent: identity?.rtaContent || false,
            //@ts-ignore
            applicationName: identity?.siteName || null,
            //@ts-ignore
            ogSiteName: identity?.siteName || null,
            ogLocale: context?.locale || null,
            ogTitle: title || null,
            ogDescription: description?.substring(0, 155) || null,
            ogType: 'website',
            ogUrl: canonicalUrl,
            //@ts-ignore
            ogImage: identity?.favIcon || '/static/images/favIcon/favicon.png',

            twitterCard: true,
            twitterUrl: canonicalUrl,
            twitterTitle: title || null,
            //@ts-ignore
            twitterSite: identity?.siteName || null,
            twitterDescription: description?.substring(0, 155) || null,
            //@ts-ignore
            twitterImage: identity?.favIcon || '/static/images/favIcon/favicon.png',
        }
    } else {
        return {
            themeColor: identity?.themeColor || '#000',
            //@ts-ignore
            favIcon: identity?.favIcon || '/static/images/favIcon/favicon.png',
            //@ts-ignore
            customScriptsAsString: identity?.customScriptsAsString || null,
            //@ts-ignore
            rtaContent: identity?.rtaContent || false,
            //@ts-ignore
            ogSiteName: identity?.siteName || null,
            ogLocale: context?.locale || null,
            //@ts-ignore
            twitterSite: identity?.siteName || null,
        }
    }


}

export default _firstRequestHeadDataSetter