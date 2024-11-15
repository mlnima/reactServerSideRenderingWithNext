import type {Metadata, ResolvingMetadata} from 'next'
import {fetchPosts} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {textContentReplacer, getTextDataWithTranslation} from "@repo/shared-util";
import {i18n} from "@i18nConfig";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {PageParams, PageSearchParams} from "@repo/typescript-types";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const alternatesGenerators = new AlternatesGenerators()
const categoryMetaGenerator = async (props: IProps, parent?: ResolvingMetadata): Promise<Metadata> => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    try {
        const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
        const settingsData = await fetchSettings({requireSettings: ['categoryPageSettings']});
        const fallbackImage = '/asset/images/default/no-image-available.png'
        const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
        const contentPerPage = initialSettingsData?.settings?.initialSettings?.contentSettings?.contentPerPage;
        const currentPageQuery = searchParams?.page;
        const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
            parseInt(currentPageQuery, 10) : 1

        const postsData = await fetchPosts({
            queryObject: {
                sort: searchParams?.sort,
                lang: params?.lang,
                metaId: params?.categoryId,
                page: currentPage,
                size: searchParams?.size
            },
            locale
        });
        const pageTitle = settingsData?.settings?.categoryPageSettings?.translations?.[locale]?.title ??
            settingsData?.settings?.categoryPageSettings?.title;
        const pageKeywords = settingsData?.settings?.categoryPageSettings?.translations?.[locale]?.keywords ??
            settingsData?.settings?.categoryPageSettings?.keywords;
        const pageDescription = settingsData?.settings?.categoryPageSettings?.translations?.[locale]?.description ??
            settingsData?.settings?.categoryPageSettings?.description;

        const description = pageDescription ?
            textContentReplacer(pageDescription, {
                name: postsData?.meta?.name,
                count: postsData?.meta?.count,
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'description', postsData?.meta)

        return {
            alternates: alternatesGenerators.metaPage(params?.lang,'category',params?.categoryId),
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
    }catch (error){
        console.log(`error=> `,error)
    }

}

export default categoryMetaGenerator;