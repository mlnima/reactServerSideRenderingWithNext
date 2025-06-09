import type { Metadata } from 'next';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPosts from '@lib/actions/database/posts/getPosts';
import { headMetaFromSettings } from '@lib/headMetaFromSettings';

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
    const fallbackImage = '/asset/images/default/no-image-available.png';
    const currentPageQuery = searchParams?.page;

    const { success, data } = await getPosts({
      locale,
      metaId: params?.actorId,
      page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
      returnPosts: false,
    });

    if (!success || !data || !data?.meta) {
      return {
        title: 'CMS',
      }
    }

    const { meta } = data;

    const alternates = params.actorId
      ? {
        alternates: alternatesGenerators.metaPage(locale, 'actor', params.actorId),
      }
      : {};

    const headData = await headMetaFromSettings({
      pageSettingToGet: 'actorPageSettings',
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
  } catch (error) {
    console.log(`actorMetaGenerator Error=> `, error);
    return {};
  }
};

export default actorMetaGenerator;
