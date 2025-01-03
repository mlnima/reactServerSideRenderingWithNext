import type { Metadata } from 'next';
import { fetchPosts } from '@lib/fetch-requests/fetchPosts';
import {
  textContentReplacer,
  getTextDataWithTranslation,
} from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { getSettings } from '@lib/database/operations/settings';

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

    const fallbackImage = '/asset/images/default/no-image-available.png';

    const { categoryPageSettings } = await getSettings([
      'categoryPageSettings',
    ]);
    const { initialSettings } = await getSettings(['initialSettings']);

    const currentPageQuery = searchParams?.page;
    const currentPage =
      currentPageQuery && typeof currentPageQuery === 'string'
        ? parseInt(currentPageQuery, 10)
        : 1;

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
      categoryPageSettings?.translations?.[locale]?.title ??
      categoryPageSettings?.title;
    const pageKeywords =
      categoryPageSettings?.translations?.[locale]?.keywords ??
      categoryPageSettings?.keywords;
    const pageDescription =
      categoryPageSettings?.translations?.[locale]?.description ??
      categoryPageSettings?.description;

    const description = pageDescription
      ? textContentReplacer(
          pageDescription,
          {
            name: postsData?.meta?.name,
            count: postsData?.meta?.count,
            siteName: initialSettings?.headDataSettings?.siteName,
          },
          new Date()
        )
      : getTextDataWithTranslation(locale, 'description', postsData?.meta);

    const alternates = params.categoryId
      ? {
          alternates: alternatesGenerators.metaPage(
            locale,
            'actor',
            params.categoryId
          ),
        }
      : {};

    return {
      ...alternates,
      title: pageTitle
        ? textContentReplacer(pageTitle, {
            name: postsData?.meta?.name,
            count: postsData?.meta?.count,
            siteName: initialSettings?.headDataSettings?.siteName,
          })
        : getTextDataWithTranslation(locale, 'title', postsData?.meta),
      description:
        description || initialSettings?.headDataSettings?.description || '',
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

export default categoryMetaGenerator;
