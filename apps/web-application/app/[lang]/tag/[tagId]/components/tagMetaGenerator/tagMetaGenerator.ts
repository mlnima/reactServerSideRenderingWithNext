import type {Metadata} from 'next'
import {fetchPosts} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {textContentReplacer, getTextDataWithTranslation} from "@repo/shared-util";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

const alternatesGenerators = new AlternatesGenerators();

const tagMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = localDetector(params.lang);
    const settingsData = await fetchSettings({requireSettings: ['tagPageSettings']});
    const fallbackImage = '/asset/images/default/no-image-available.png'
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const postsData = await fetchPosts({
        queryObject: {
            sort: searchParams?.sort,
            lang: locale,
            metaId: params?.tagId,
            page: currentPage,
            size: searchParams?.size
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
        getTextDataWithTranslation(locale, 'description', postsData?.meta)

    const alternates = params?.tagId
        ? {
            alternates: alternatesGenerators.metaPage(locale,'tag',params?.tagId),
        }
        : {};
    return {
        ...alternates,
        title: pageTitle ?
            textContentReplacer(pageTitle, {
                name: postsData?.meta?.name,
                count: postsData?.meta?.count,
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(locale, 'title', postsData?.meta),
        description: description || initialSettingsData?.settings?.initialSettings?.headDataSettings?.description || '',
        keywords: `${postsData?.meta?.name}${pageKeywords ? `, ${pageKeywords}` : ''}`,
        openGraph: {
            images: [postsData?.meta?.imageUrl || fallbackImage],
        }
    }
}

export default tagMetaGenerator;