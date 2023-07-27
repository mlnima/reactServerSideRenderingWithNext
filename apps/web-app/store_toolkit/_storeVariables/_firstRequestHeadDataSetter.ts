import {getTextDataWithTranslation, textContentReplacer,capitalizeFirstLetter} from "custom-util";
import {metasCanonicalUrlGenerator} from "custom-util";

const _firstRequestHeadDataSetter = (context, page: string, setHeadData: boolean, identity: any) => {

    const matchPathRegex = new RegExp('search|tags|categories|actors|homePage|profile|posts|chatroom|messenger|login|register|user', 'i')

    if (matchPathRegex.test(page) && setHeadData) {
        const title = page && page?.match('search|tags|categories|actors') ?
            textContentReplacer(
                getTextDataWithTranslation(context.locale, `${page}PageTitle`, identity)
                + ` | ${identity?.siteName}`,
                //@ts-ignore
                {
                    // /api/og
                    //@ts-ignore
                           name: page === 'search' ?
                               //@ts-ignore
                        `${capitalizeFirstLetter(context.query?.keyword as string)} ` :
                               //@ts-ignore
                        ` ${capitalizeFirstLetter(page as string)} `
                }
            )
            : getTextDataWithTranslation(context.locale, 'title', identity)

        const description = page && page?.match('search|tags|categories|actors') ?
            textContentReplacer(
                getTextDataWithTranslation(context.locale, `${page}PageDescription`, identity)
                + `| ${identity?.siteName}`,
                //@ts-ignore
                {
                    name: page === 'search' ?
                        `${capitalizeFirstLetter(context.query?.keyword)}` :
                        `${capitalizeFirstLetter(page)}`
                }
            )
            : getTextDataWithTranslation(context.locale, 'description', identity)

        const isMetaPageRegex = /categories|tags|actors/g

        const pageUrl = isMetaPageRegex.test(page) ?
            metasCanonicalUrlGenerator(page, context.locale, context.query.page) :
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
            favIcon: identity?.favIcon || '/asset/images/default/favIcon/favicon.png',
            customScriptsAsString: identity?.customScriptsAsString || '',
            rtaContent: identity?.rtaContent || false,
            applicationName: identity?.siteName || null,
            ogSiteName: identity?.siteName || null,
            ogLocale: context?.locale || null,
            ogTitle: title || null,
            ogDescription: description?.substring(0, 155) || null,
            ogType: 'website',
            ogImage: identity?.favIcon || '/asset/images/default/favIcon/favicon.png',
            twitterCard: true,
            twitterTitle: title || null,
            twitterSite: identity?.siteName || null,
            twitterDescription: description?.substring(0, 155) || null,
            twitterImage: identity?.favIcon || '/asset/images/default/favIcon/favicon.png',
        }
    } else {
        return {
            themeColor: identity?.themeColor || '#000',
            favIcon: identity?.favIcon || '/asset/images/default/favIcon/favicon.png',
            customScriptsAsString: identity?.customScriptsAsString || null,
            rtaContent: identity?.rtaContent || false,
            ogSiteName: identity?.siteName || null,
            ogLocale: context?.locale || null,
            twitterSite: identity?.siteName || null,
        }
    }


}

export default _firstRequestHeadDataSetter