import { getDictionary } from '../../../../../get-dictionary';
import { capitalizeFirstLetters } from '@repo/utils';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IInitialSettings, IMeta, IPageProps, IPost } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSearch from '@lib/actions/database/operations/search/getSearch';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import { headMetaFromSettings } from '@lib/headMetaFromSettings';

const alternatesGenerators = new AlternatesGenerators();

const searchMetaGenerator = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );

  const contentPerPage = initialSettings?.contentSettings?.contentPerPage || 20;

  const siteName = initialSettings?.headDataSettings?.siteName || '';
  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  // const { totalCount } =
  //     await getSearch({
  //         keyword: params.keyword,
  //         page: currentPage,
  //         locale,
  //         returnPosts: false;
  //         returnMetas: false;
  //     });


  const { success, data } =
    await getSearch({
      keyword: params.keyword,
      page: currentPage,
      locale,
      returnPosts: false,
      returnMetas: false,
    }) as ServerActionResponse<{
      posts: IPost[],
      totalCount: number,
      actors: IMeta[],
      categories: IMeta[],
      tags: IMeta[],
    }>;


  if (!success || !data) {
    return {};
  }


  // const title = `${params.keyword ? capitalizeFirstLetters(decodeURIComponent(params.keyword)) : ''} - ${
  //   data?.totalCount || 0
  // } ${dictionary['Search Results'] || 'Search Results'} ${siteName || ''}`;
  //


  const alternates = params.keyword
    ? {
      alternates: alternatesGenerators.searchPage(locale, params.keyword),
    }
    : {};

  const headData = await headMetaFromSettings({
    pageSettingToGet: 'searchPageSettings',
    locale,
    pageNumber: searchParams?.page || '',
    fallbackTitle: 'Pornstar',
    count: data?.totalCount ? data?.totalCount.toString() : '',
    name: params.keyword,
  });

  return {
    ...alternates,
    ...headData,

  };
};

export default searchMetaGenerator;
