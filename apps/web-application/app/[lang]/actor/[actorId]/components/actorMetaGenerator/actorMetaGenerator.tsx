import type { Metadata } from 'next';
import { fetchPosts } from '@lib/fetch-requests/fetchPosts';
import { textContentReplacer, getTextDataWithTranslation } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import {getSettings} from "@lib/database/operations/settings";
import {getPosts} from "@lib/database/operations/posts";

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
        const { actorPageSettings  } = await getSettings(['actorPageSettings']);
        const {  initialSettings } = await getSettings(['initialSettings']);

        const fallbackImage = '/asset/images/default/no-image-available.png';
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

        const { meta, totalCount } = await getPosts({
            locale,
            metaId: params?.actorId,
            page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
            returnPosts:false
        });

        const pageTitle = actorPageSettings?.title;
        const pageKeywords = actorPageSettings?.keywords;
        const pageDescription = actorPageSettings?.description;

        const description = pageDescription
            ? textContentReplacer(pageDescription, {
                  name: meta?.name,
                  count: meta?.count,
                  siteName: initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'description', meta);

        const alternates = params.actorId
            ? {
                  alternates: alternatesGenerators.metaPage(locale, 'actor', params.actorId),
              }
            : {};

        return {
            ...alternates,
            title: pageTitle
                ? textContentReplacer(pageTitle, {
                      name: meta?.name,
                      count: meta?.count,
                      siteName: initialSettings?.headDataSettings?.siteName,
                  })
                : getTextDataWithTranslation(locale, 'title', meta),
            description:
                description || initialSettings?.headDataSettings?.description || '',
            keywords: `${meta?.name}${pageKeywords ? `, ${pageKeywords}` : ''}`,
            openGraph: {
                images: [meta?.imageUrl || fallbackImage],
            },
        };
    } catch (error) {
        console.log(`error=> `, error);
        return {};
    }
};

export default actorMetaGenerator;
