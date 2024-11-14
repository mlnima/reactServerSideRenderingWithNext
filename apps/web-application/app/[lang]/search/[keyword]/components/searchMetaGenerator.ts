import { fetchSearch } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getDictionary } from '../../../../../get-dictionary';
import { i18n } from '@i18nConfig';
import { capitalizeFirstLetters } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import {IPageProps} from "@repo/typescript-types";


const alternatesGenerators = new AlternatesGenerators();

const searchMetaGenerator = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;


    const locale = i18n.locales.includes(params.lang)
        ? params.lang
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
        keyword: params.keyword,
        page: currentPage,
    };

    const searchData = await fetchSearch({ queryObject, locale });
    const title = `${capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))} - ${
        searchData?.totalCount
    } ${dictionary['Search Results'] || 'Search Results'} ${siteName || ''}`;

    return {
        alternates: alternatesGenerators.searchPage(params.lang, params.keyword),
        title,
    };
};

export default searchMetaGenerator;
