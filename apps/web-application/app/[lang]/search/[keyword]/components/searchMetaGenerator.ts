import { fetchSearch } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getDictionary } from '../../../../../get-dictionary';
import { capitalizeFirstLetters } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

const alternatesGenerators = new AlternatesGenerators();

const searchMetaGenerator = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
    const siteName = settingsData?.settings?.initialSettings?.headDataSettings?.siteName || '';

    const currentPageQuery = searchParams?.page;
    const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

    const queryObject = {
        sort: searchParams?.sort,
        lang: locale,
        keyword: params.keyword,
        page: currentPage,
    };

    const searchData = await fetchSearch({ queryObject, locale });
    const title = `${params.keyword ? capitalizeFirstLetters(decodeURIComponent(params.keyword)) : ''} - ${
        searchData?.totalCount
    } ${dictionary['Search Results'] || 'Search Results'} ${siteName || ''}`;

    const alternates = params.keyword
        ? {
              alternates: alternatesGenerators.searchPage(locale, params.keyword),
          }
        : {};
    return {
        ...alternates,
        title,
    };
};

export default searchMetaGenerator;
