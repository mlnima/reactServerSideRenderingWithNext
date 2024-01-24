import type {Metadata, ResolvingMetadata} from 'next'
import {fetchPosts, fetchSettings} from "fetch-requests";
import {textContentReplacer, getTextDataWithTranslation} from "custom-util";
import {i18n} from "@i18nConfig";

type Props = {
    params: { tagId: string, lang: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const tagMetaGenerator = async ({params, searchParams}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {
    const locale = i18n.locales.includes(params?.lang) ? params.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const settingsData = await fetchSettings({requireSettings: ['tagPageSettings']});
    const fallbackImage = '/asset/images/default/no-image-available.png'
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;
    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const postsData = await fetchPosts({
        queryObject: {
            sort: searchParams?.sort,
            lang: params?.lang,
            metaId: params?.tagId,
            page: currentPage,
            size: searchParams?.size || numberOfCardsPerPage
        },
        locale
    });
    const pageTitle = settingsData?.settings?.tagPageSettings?.title;
    const pageKeywords = settingsData?.settings?.tagPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.tagPageSettings?.description;

    const description = pageDescription ?
        textContentReplacer(pageDescription, {
            name: postsData?.meta?.name,
            count: postsData?.meta?.count,
            siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
        }) :
        getTextDataWithTranslation(params?.lang, 'description', postsData?.meta)

    return {
        // alternates: {
        //     canonical: `/tag/${params?.tagId}`,
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //         finalValue[currentLocale] = `/${currentLocale}/tag/${params?.tagId}`
        //         return finalValue
        //     },{}),
        // },
        title: pageTitle ?
            textContentReplacer(pageTitle, {
                name: postsData?.meta?.name,
                count: postsData?.meta?.count,
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'title', postsData?.meta),
        description: description || initialSettingsData?.settings?.initialSettings?.headDataSettings?.description || '',
        keywords: `${postsData?.meta?.name}${pageKeywords ? `, ${pageKeywords}` : ''}`,
        openGraph: {
            images: [postsData?.meta?.imageUrl || fallbackImage],
        }
    }
}

export default tagMetaGenerator;