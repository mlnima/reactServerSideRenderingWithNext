//LayoutMetaGenerator

import type {Metadata, ResolvingMetadata} from 'next'
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";
import * as process from "process";
import alternatesCanonicalGenerator from "@lib/alternatesCanonicalGenerator";

type Props = {
    params: { identifier: string ,lang:string}
    searchParams: { [key: string]: string | string[] | undefined }
}

const LayoutMetaGenerator = async ({params: {lang}, searchParams}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {

    const fallbackIcon = '/asset/images/default/favicon.png'
    const settingsData = await fetchSettings({requireSettings: ['initialSettings']})

    // const alternates = alternatesCanonicalGenerator({lang,currentPath:'/'})
    //
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL as string),
        // alternates,
        title: settingsData?.settings?.initialSettings?.headDataSettings?.translations?.[lang]?.title ??
               (settingsData?.settings?.initialSettings?.headDataSettings?.title || 'CMS'),

        description: settingsData?.settings?.initialSettings?.headDataSettings?.translations?.[lang]?.description ??
            (settingsData?.settings?.initialSettings?.headDataSettings?.description || 'CMS Description'),
        keywords: settingsData?.settings?.initialSettings?.headDataSettings?.translations?.[lang]?.description ??
            (settingsData?.settings?.initialSettings?.headDataSettings?.description || 'CMS'),
        icons: {
            icon: settingsData?.settings?.initialSettings?.headDataSettings?.favIconUrl || fallbackIcon,
            shortcut: settingsData?.settings?.initialSettings?.headDataSettings?.favIconUrl || fallbackIcon,
            apple: settingsData?.settings?.initialSettings?.headDataSettings?.favIconUrl || fallbackIcon
        },
        // viewport: {
        //     width: 'device-width',
        //     initialScale: 1,
        //     maximumScale: 1,
        // },
        // themeColor:settingsData?.settings?.initialSettings?.headDataSettings?.themeColor || 'black',
        applicationName:settingsData?.settings?.initialSettings?.headDataSettings?.siteName,
        openGraph:{
            title: settingsData?.settings?.initialSettings?.headDataSettings?.translations?.[lang]?.title ??
                (settingsData?.settings?.initialSettings?.headDataSettings?.title || 'CMS'),
            type:'website',
            description:settingsData?.settings?.initialSettings?.headDataSettings?.translations?.[lang]?.description ??
                (settingsData?.settings?.initialSettings?.headDataSettings?.description || 'CMS Description'),
            images:[settingsData?.settings?.initialSettings?.headDataSettings?.favIconUrl || fallbackIcon],

            siteName:settingsData?.settings?.initialSettings?.headDataSettings?.siteName,
            locale:lang,
        },

        // alternates: {
        //     canonical: '/',
        //     languages: {
        //         'en-US': '/en-US',
        //         'de-DE': '/de-DE',
        //     },
        // },


    }
}

export default LayoutMetaGenerator;