import { fetchSearch } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getDictionary } from '../../../../../get-dictionary';
import { i18n } from '@i18nConfig';
import { capitalizeFirstLetters } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';

type Props = {
    params: { keyword: string; lang: string };
    searchParams: {
        [key: string]: string | string[] | undefined;
        postType?: string;
        page?: string;
    };
};

const alternatesGenerators = new AlternatesGenerators();

const searchMetaGenerator = async ({ params: { lang, keyword }, searchParams }: Props) => {
    const locale = i18n.locales.includes(lang)
        ? lang
        : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
    const siteName = settingsData?.settings?.initialSettings?.headDataSettings?.siteName || '';
    const initialSettingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
    const contentPerPage =
        initialSettingsData?.settings?.initialSettings?.contentSettings?.contentPerPage;

    const currentPageQuery = searchParams?.page;
    const currentPage =
        currentPageQuery && typeof currentPageQuery === 'string'
            ? parseInt(currentPageQuery, 10)
            : 1;

    const queryObject = {
        sort: searchParams?.sort,
        lang: locale,
        keyword: keyword,
        page: currentPage,
    };

    const searchData = await fetchSearch({ queryObject, locale });
    const title = `${capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))} - ${
        searchData?.totalCount
    } ${dictionary['Search Results'] || 'Search Results'} ${siteName || ''}`;

    return {
        alternates: alternatesGenerators.searchPage(lang, keyword),
        title,
    };
};

export default searchMetaGenerator;
