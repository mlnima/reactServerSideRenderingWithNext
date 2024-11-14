import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "@i18nConfig";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {getTextDataWithTranslation, textContentReplacer} from "@repo/shared-util";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {PageParams, PageSearchParams} from "@repo/typescript-types";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const alternatesGenerators = new AlternatesGenerators();
const categoriesMetaGenerator = async (props: IProps, parent?: ResolvingMetadata): Promise<Metadata> => {
    //const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const settingsData = await fetchSettings({requireSettings: ['categoriesPageSettings']});
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})

    const pageTitle = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.categoriesPageSettings?.title;
    const pageKeywords = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.categoriesPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.categoriesPageSettings?.description

    return {
        alternates: alternatesGenerators.metasPage(params?.lang, 'categories'),
        title: pageTitle ?
            textContentReplacer(pageTitle, {
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'title', settingsData?.settings?.categoriesPageSettings),
        description: pageDescription ?
            textContentReplacer(pageDescription, {
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'description', settingsData?.settings?.categoriesPageSettings),
        keywords: pageKeywords ?? ''
    }
}


export default categoriesMetaGenerator;