import type {Metadata, ResolvingMetadata} from 'next'
import {i18n} from "@i18nConfig";
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";
import {getTextDataWithTranslation, textContentReplacer} from "shared-util";

type Props = {
    params: { lang: string }
}


const categoriesMetaGenerator = async ({params}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const settingsData = await fetchSettings({requireSettings: ['categoriesPageSettings']});
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})

    const pageTitle = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.categoriesPageSettings?.title;
    const pageKeywords = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.categoriesPageSettings?.keywords;
    const pageDescription = settingsData?.settings?.categoriesPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.categoriesPageSettings?.description

    return {
        // alternates: {
        //     canonical: `/categories`,
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //         finalValue[currentLocale] = `/${currentLocale}/categories`
        //         return finalValue
        //     },{}),
        // },
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