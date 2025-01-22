import type { Metadata } from 'next';
import {
  textContentReplacer,
  getTextDataWithTranslation,
} from '@repo/utils';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { getPosts } from '@lib/database/operations/posts';
import { getSettings } from '@lib/database/operations/settings';

const alternatesGenerators = new AlternatesGenerators();

const tagMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);
  const { tagPageSettings, initialSettings } = await getSettings([
    'tagPageSettings',
    'initialSettings',
  ]);

  const fallbackImage = '/asset/images/default/no-image-available.png';

  const currentPageQuery = searchParams?.page;

  const { meta } = await getPosts({
    locale,
    metaId: params?.categoryId,
    page:
      currentPageQuery && typeof currentPageQuery === 'string'
        ? parseInt(currentPageQuery, 10)
        : 1,
  });

  const pageTitle = tagPageSettings?.title;
  const pageKeywords = tagPageSettings?.keywords;
  const pageDescription = tagPageSettings?.description;

  const description = pageDescription
    ? textContentReplacer(pageDescription, {
        name: meta?.name,
        count: meta?.count,
        siteName: initialSettings?.headDataSettings?.siteName,
      })
    : getTextDataWithTranslation(locale, 'description', meta);

  const alternates = params?.tagId
    ? {
        alternates: alternatesGenerators.metaPage(locale, 'tag', params?.tagId),
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
};

export default tagMetaGenerator;
