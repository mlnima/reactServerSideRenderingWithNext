import type { Metadata } from 'next';
import { fetchPosts } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { textContentReplacer, getTextDataWithTranslation } from '@repo/shared-util';
import { i18n } from '@i18nConfig';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

interface IProps {
    params: PageParams;
    searchParams?: PageSearchParams;
}

const alternatesGenerators = new AlternatesGenerators();

const categoryMetaGenerator = async (props: IProps): Promise<Metadata> => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    try {
        const locale = localDetector(params.lang);
        const settingsData = await fetchSettings({ requireSettings: ['categoryPageSettings'] });
        const fallbackImage = '/asset/images/default/no-image-available.png';
        const initialSettingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
        const currentPageQuery = searchParams?.page;
        const currentPage =
            currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

        const postsData = await fetchPosts({
            queryObject: {
                sort: searchParams?.sort,
                lang: locale,
                metaId: params?.categoryId,
                page: currentPage,
                size: searchParams?.size,
            },
            locale,
        });
        const pageTitle =
            settingsData?.settings?.categoryPageSettings?.translations?.[locale]?.title ??
            settingsData?.settings?.categoryPageSettings?.title;
        const pageKeywords =
            settingsData?.settings?.categoryPageSettings?.translations?.[locale]?.keywords ??
            settingsData?.settings?.categoryPageSettings?.keywords;
        const pageDescription =
            settingsData?.settings?.categoryPageSettings?.translations?.[locale]?.description ??
            settingsData?.settings?.categoryPageSettings?.description;

        const description = pageDescription
            ? textContentReplacer(pageDescription, {
                  name: postsData?.meta?.name,
                  count: postsData?.meta?.count,
                  siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'description', postsData?.meta);

        const alternates = params.categoryId
            ? {
                  alternates: alternatesGenerators.metaPage(locale, 'actor', params.categoryId),
              }
            : {};

        return {
            ...alternates,
            title: pageTitle
                ? textContentReplacer(pageTitle, {
                      name: postsData?.meta?.name,
                      count: postsData?.meta?.count,
                      siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
                  })
                : getTextDataWithTranslation(locale, 'title', postsData?.meta),
            description:
                description || initialSettingsData?.settings?.initialSettings?.headDataSettings?.description || '',
            keywords: `${postsData?.meta?.name}${pageKeywords ? `, ${pageKeywords}` : ''}`,
            openGraph: {
                images: [postsData?.meta?.imageUrl || fallbackImage],
            },
        };
    } catch (error) {
        console.log(`error=> `, error);
        return {}
    }
};

export default categoryMetaGenerator;
