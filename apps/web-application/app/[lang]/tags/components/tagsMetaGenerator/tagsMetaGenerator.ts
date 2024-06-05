import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "../../../../../i18n-config";
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";
import {getTextDataWithTranslation, textContentReplacer} from "shared-util";

type Props = {
    params: { lang: string }
}

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
        // alternates: {
        //     canonical: `/tags`,
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/tags`
        //             return finalValue
        //         },{}),
        // },
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