import { getDictionary } from '../../../../../get-dictionary';
import { capitalizeFirstLetter, queryUniquer } from '@repo/utils';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IInitialSettings, IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/settings/getSettings';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

const alternatesGenerators = new AlternatesGenerators();

//can be improved by fetching total count of the existing posts
const postsMetaGenerator = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );
  const siteName = initialSettings?.headDataSettings?.siteName || '';
  const postType = searchParams?.postType ? `${capitalizeFirstLetter(queryUniquer(searchParams?.postType))}s` : 'posts';

  return {
    alternates: alternatesGenerators.staticPage(locale, 'posts'),
    title: `${siteName} | ${dictionary?.[postType] || postType} ${dictionary?.['Page'] || 'Page'} ${searchParams?.page || 1}`,
  };
};

export default postsMetaGenerator;
