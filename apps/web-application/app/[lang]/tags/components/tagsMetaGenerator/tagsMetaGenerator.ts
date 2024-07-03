import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "@i18nConfig";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {getTextDataWithTranslation, textContentReplacer} from "@repo/shared-util";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";

type Props = {
    params: { lang: string }
}

const alternatesGenerators = new AlternatesGenerators();

const tagsMetaGenerator = async ({params}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const settingsData = await fetchSettings({requireSettings: ['tagsPageSettings']});
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']});

    const pageTitle = settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.tagsPageSettings?.title;
    const pageKeywords = settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.tagsPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.tagsPageSettings?.description

    return {
        alternates: alternatesGenerators.metasPage(params?.lang, 'tags'),
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