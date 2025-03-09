import type { Metadata } from 'next';
import {
  textContentReplacer,
  getTextDataWithTranslation,
} from '@repo/utils';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import getPosts from "@lib/actions/database/operations/posts/getPosts";

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

    const { success, data } = await getPosts({
      locale,
      metaId: params?.categoryId,
      page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
      returnPosts: false,
    });

    if (!success || !data || !data?.meta) {
      return {};
    }

    const meta = data.meta;

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
            name: meta?.name,
            count: meta?.count ? meta?.count.toString() : '0',
            siteName: initialSettings?.headDataSettings?.siteName,
          }
        )
      : getTextDataWithTranslation(locale, 'description', meta);

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
            name: meta?.name,
          count: meta?.count ? meta?.count.toString() : '0',
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

export default categoryMetaGenerator;
