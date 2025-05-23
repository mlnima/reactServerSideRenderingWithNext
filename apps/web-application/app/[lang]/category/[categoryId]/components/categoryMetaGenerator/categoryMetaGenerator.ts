import type { Metadata } from 'next';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import {  PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPosts from "@lib/actions/database/posts/getPosts";
import { headMetaFromSettings } from '@lib/headMetaFromSettings';

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

    const alternates = params.categoryId
      ? {
          alternates: alternatesGenerators.metaPage(
            locale,
            'actor',
            params.categoryId
          ),
        }
      : {};

    const headData = await headMetaFromSettings({
      pageSettingToGet: 'categoryPageSettings',
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
    console.log(`error=> `, error);
    return {};
  }
};

export default categoryMetaGenerator;
