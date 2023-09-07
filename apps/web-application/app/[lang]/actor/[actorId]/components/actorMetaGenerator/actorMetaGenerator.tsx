import type {Metadata, ResolvingMetadata} from 'next'
import {fetchPosts, fetchSettings} from "fetch-requests";
import {textContentReplacer, getTextDataWithTranslation} from "custom-util";

type Props = {
    params: { actorId: string, lang: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const actorMetaGenerator = async ({params, searchParams}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {
    const settingsData = await fetchSettings({requireSettings: ['actorPageSettings']});
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
            metaId: params?.actorId,
            page: currentPage,
            size: searchParams?.size || numberOfCardsPerPage
        }
    });
    const pageTitle = settingsData?.settings?.actorPageSettings?.title;
    const pageKeywords = settingsData?.settings?.actorPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.actorPageSettings?.description;

    const description = pageDescription ?
        textContentReplacer(pageDescription, {
            name: postsData?.meta?.name,
            count: postsData?.meta?.count,
            siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
        }) :
        getTextDataWithTranslation(params?.lang, 'description', postsData?.meta)

    return {
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

export default actorMetaGenerator;