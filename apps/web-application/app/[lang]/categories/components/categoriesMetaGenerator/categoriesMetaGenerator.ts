import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "../../../../../i18n-config";
import {fetchSettings} from "fetch-requests";
import {getTextDataWithTranslation, textContentReplacer} from "custom-util";

type Props = {
    params: { lang: string }
}


const categoriesMetaGenerator = async ({params}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const settingsData = await fetchSettings(['categoriesPageSettings']);
    const initialSettingsData = await fetchSettings(['initialSettings'])

    const pageTitle = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.categoriesPageSettings?.title;
    const pageKeywords = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.categoriesPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.categoriesPageSettings?.description

    return {
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