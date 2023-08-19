import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "../../../../../i18n-config";
import {fetchSettings} from "fetch-requests";
import {getTextDataWithTranslation, textContentReplacer} from "custom-util";

type Props = {
    params: { lang: string }
}


const actorsMetaGenerator = async ({params}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const settingsData = await fetchSettings(['actorsPageSettings']);
    const initialSettingsData = await fetchSettings(['initialSettings'])

    const pageTitle = settingsData?.settings?.actorsPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.actorsPageSettings?.title;
    const pageKeywords = settingsData?.settings?.actorsPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.actorsPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.actorsPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.actorsPageSettings?.description

    return {
        title: pageTitle ?
            textContentReplacer(pageTitle, {
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'title', settingsData?.settings?.actorsPageSettings),
        description: pageDescription ?
            textContentReplacer(pageDescription, {
                siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName
            }) :
            getTextDataWithTranslation(params?.lang, 'description', settingsData?.settings?.actorsPageSettings),
        keywords: pageKeywords ?? ''
    }
}


export default actorsMetaGenerator;