import {fetchSettings} from "fetch-requests";
import {getDictionary} from "../../../../../get-dictionary";
import {i18n} from "../../../../../i18n-config";
import {capitalizeFirstLetter} from "custom-util";

type Props = {
    params: { categoryId: string, lang: string }
    searchParams: {
        [key: string]: string | string[] | undefined
        postType?: string,
        page?: string,
    }
}

//can be improved by fetching total count of the existing posts
const postsMetaGenerator = async ({params, searchParams}: Props) => {
    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const siteName = settingsData?.settings?.initialSettings?.headDataSettings?.siteName || ''
    const postType = `${capitalizeFirstLetter(searchParams?.postType)}s` || 'posts'

    return {
        title: `${siteName} | ${dictionary?.[postType] || postType } ${dictionary?.['Page'] || 'Page'} ${searchParams?.page || 1}`
    }
}

export default postsMetaGenerator;