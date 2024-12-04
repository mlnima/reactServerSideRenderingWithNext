import type { Metadata } from 'next';
import { fetchPosts } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { textContentReplacer, getTextDataWithTranslation } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

interface IProps {
    params: PageParams;
    searchParams?: PageSearchParams;
}

const alternatesGenerators = new AlternatesGenerators();

const actorMetaGenerator = async (props: IProps): Promise<Metadata> => {
    try {
        const searchParams = await props.searchParams;
        const params = await props.params;

        const locale = localDetector(params.lang);
        const settingsData = await fetchSettings({ requireSettings: ['actorPageSettings'] });
        const fallbackImage = '/asset/images/default/no-image-available.png';
        const initialSettingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
        const currentPageQuery = searchParams?.page;
        const currentPage =
            currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

        const postsData = await fetchPosts({
            queryObject: {
                sort: searchParams?.sort,
                lang: locale,
                metaId: params?.actorId,
                page: currentPage,
                size: searchParams?.size,
            },
            locale,
        });

        const pageTitle = settingsData?.settings?.actorPageSettings?.title;
        const pageKeywords = settingsData?.settings?.actorPageSettings?.keywords;
        const pageDescription = settingsData?.settings?.actorPageSettings?.description;

        const description = pageDescription
            ? textContentReplacer(pageDescription, {
                  name: postsData?.meta?.name,
                  count: postsData?.meta?.count,
                  siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'description', postsData?.meta);

        const alternates = params.actorId
            ? {
                  alternates: alternatesGenerators.metaPage(locale, 'actor', params.actorId),
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
        return {};
    }
};

export default actorMetaGenerator;
