import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "../../../../../i18n-config";
import {fetchSettings} from "fetch-requests";
import {getTextDataWithTranslation, textContentReplacer} from "custom-util";

type Props = {
    params: { lang: string }
}

const tagsMetaGenerator = async ({params}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const settingsData = await fetchSettings(['tagsPageSettings']);
    const initialSettingsData = await fetchSettings(['initialSettings']);

    const pageTitle = settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.tagsPageSettings?.title;
    const pageKeywords = settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.tagsPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.tagsPageSettings?.description

    return {
        title: pageTitle ?
            textContentReplacer(pageTitle, {
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'title', settingsData?.settings?.tagsPageSettings),
        description: pageDescription ?
            textContentReplacer(pageDescription, {
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'description', settingsData?.settings?.tagsPageSettings),
        keywords: pageKeywords ?? ''
    }
}


export default tagsMetaGenerator;