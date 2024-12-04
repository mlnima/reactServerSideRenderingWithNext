import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getDictionary } from '../../../../../get-dictionary';
import { capitalizeFirstLetter } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

const alternatesGenerators = new AlternatesGenerators();

//can be improved by fetching total count of the existing posts
const postsMetaGenerator = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
    const siteName = settingsData?.settings?.initialSettings?.headDataSettings?.siteName || '';
    const postType = `${capitalizeFirstLetter(searchParams?.postType)}s` || 'posts';

    return {
        alternates: alternatesGenerators.staticPage(locale, 'posts'),
        title: `${siteName} | ${dictionary?.[postType] || postType} ${dictionary?.['Page'] || 'Page'} ${searchParams?.page || 1}`,
    };
};

export default postsMetaGenerator;
