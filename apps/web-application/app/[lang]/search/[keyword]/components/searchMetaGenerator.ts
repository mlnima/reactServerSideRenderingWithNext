import { getDictionary } from '../../../../../get-dictionary';
import { capitalizeFirstLetters } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import {getSearch} from "@lib/database/operations/posts";
import {getSettings} from "@lib/database/operations/settings";

const alternatesGenerators = new AlternatesGenerators();

const searchMetaGenerator = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const { initialSettings } = await getSettings( ['initialSettings']);
    const siteName = initialSettings?.headDataSettings?.siteName || '';
    const currentPageQuery = searchParams?.page;
    const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

    const { totalCount } =
        await getSearch({
            keyword: params.keyword,
            page: currentPage,
            locale,
        });

    const title = `${params.keyword ? capitalizeFirstLetters(decodeURIComponent(params.keyword)) : ''} - ${
        totalCount || 0
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
