import {fetchSearch} from "@lib/fetch-requests/client/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";
import {getDictionary} from "../../../../../get-dictionary";
import {i18n} from "@i18nConfig";
import {capitalizeFirstLetter, capitalizeFirstLetters} from "shared-util";
// import {capitalizeFirstLetter} from "shared-util";

type Props = {
    params: { keyword: string, lang: string }
    searchParams: {
        [key: string]: string | string[] | undefined
        postType?: string,
        page?: string,
    }
}

//can be improved by fetching total count of the existing posts
const searchMetaGenerator = async ({params:{lang,keyword}, searchParams}: Props) => {
    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const siteName = settingsData?.settings?.initialSettings?.headDataSettings?.siteName || ''
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const queryObject = {
        sort: searchParams?.sort,
        lang: locale,
        keyword: keyword,
        page: currentPage,
        size: numberOfCardsPerPage,
        // searchType: searchParams?.searchType
    }

    const searchData = await fetchSearch({queryObject,locale});

    const title = `${
        capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))
    } - ${
        searchData?.totalCount} ${dictionary['Result'] || 'Result'} ${siteName||''
    }`;

    return {
        // alternates: {
        //     canonical: '/posts',
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/posts`
        //             return finalValue
        //         },{}),
        // },
        // title: keyword ? `${dictionary['Search Result For'] || 'Search Result For'}: ${keyword}` :
        //     settingsData?.settings?.initialSettings?.headDataSettings?.translations?.[locale]?.title ??
        //     (settingsData?.settings?.initialSettings?.headDataSettings?.title || 'CMS'),
        title,
    }
}

export default searchMetaGenerator;