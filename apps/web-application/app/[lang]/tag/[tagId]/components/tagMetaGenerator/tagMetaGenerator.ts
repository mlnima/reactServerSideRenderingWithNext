import type { Metadata } from 'next';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPosts from '@lib/actions/database/operations/posts/getPosts';
import { headMetaFromSettings } from '@lib/headMetaFromSettings';

const alternatesGenerators = new AlternatesGenerators();

const tagMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);

  const fallbackImage = '/asset/images/default/no-image-available.png';

  const currentPageQuery = searchParams?.page;


  const { success, data } = await getPosts({
    locale,
    metaId: params?.tagId,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
    returnPosts: false,
  });


  if (!success || !data || !data?.meta) {
    return {};
  }

  const meta = data.meta;

  const alternates = params?.tagId
    ? {
      alternates: alternatesGenerators.metaPage(locale, 'tag', params?.tagId),
    }
    : {};

  const headData = await headMetaFromSettings({
    pageSettingToGet: 'tagPageSettings',
    locale,
    pageNumber: searchParams?.page || '',
    fallbackTitle: 'Pornstar',
    count: meta?.count ? meta?.count.toString() : '0',
    name: meta?.name,
  });

  return {
    ...alternates,
    ...headData,
    openGraph: {
      images: [meta?.imageUrl || fallbackImage],
    },
  };
};

export default tagMetaGenerator;
