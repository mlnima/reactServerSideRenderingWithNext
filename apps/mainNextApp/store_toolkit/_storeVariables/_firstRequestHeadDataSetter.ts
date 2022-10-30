import {getTextDataWithTranslation, textContentReplacer} from "@_variables/custom-vaiables";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {_metasCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";

const _firstRequestHeadDataSetter = (context, page: string, setHeadData: boolean, identity: any) => {
    const matchPathRegex = new RegExp('search|tags|categories|actors|home|profile|posts|chatroom|messenger|login|register|user', 'i')

    if (matchPathRegex.test(page) && setHeadData) {
        const title = page && page?.match('search|tags|categories|actors') ?
            textContentReplacer(
                getTextDataWithTranslation(context.locale, `${page}PageTitle`, identity)
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
                + `| ${identity?.siteName}`,
                {
                    name: page === 'search' ?
                        `${capitalizeFirstLetter(context.query?.keyword)}` :
                        `${capitalizeFirstLetter(page)}`
                }
            )
            : getTextDataWithTranslation(context.locale, 'description', identity)

        const isMetaPageRegex = /categories|tags|actors/g

        const pageUrl = isMetaPageRegex.test(page) ?
            _metasCanonicalUrlGenerator(page, context.locale, context.query.page) :
            null


        const ogUrls = pageUrl ? {
            ogUrl: pageUrl,
            twitterUrl: pageUrl,
        } : {}

        return {
            title: title || null,
            description: description?.substring(0, 155) || null,
            keywords: [(page !== 'home' ? page : ''), ...(getTextDataWithTranslation(context.locale, 'keywords', identity) || [])],
            themeColor: identity?.themeColor || '#000',
            ...ogUrls,
            favIcon: identity?.favIcon || '/static/images/favIcon/favicon.png',
            customScriptsAsString: identity?.customScriptsAsString || '',
            rtaContent: identity?.rtaContent || false,
            applicationName: identity?.siteName || null,
            ogSiteName: identity?.siteName || null,
            ogLocale: context?.locale || null,
            ogTitle: title || null,
            ogDescription: description?.substring(0, 155) || null,
            ogType: 'website',
            ogImage: identity?.favIcon || '/static/images/favIcon/favicon.png',
            twitterCard: true,
            twitterTitle: title || null,
            twitterSite: identity?.siteName || null,
            twitterDescription: description?.substring(0, 155) || null,
            twitterImage: identity?.favIcon || '/static/images/favIcon/favicon.png',
        }
    } else {
        return {
            themeColor: identity?.themeColor || '#000',
            favIcon: identity?.favIcon || '/static/images/favIcon/favicon.png',
            customScriptsAsString: identity?.customScriptsAsString || null,
            rtaContent: identity?.rtaContent || false,
            ogSiteName: identity?.siteName || null,
            ogLocale: context?.locale || null,
            twitterSite: identity?.siteName || null,
        }
    }


}

export default _firstRequestHeadDataSetter