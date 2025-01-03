import type {Metadata} from 'next'
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {getSettings} from "@lib/database/operations/settings";

type Params = Promise<{ lang: string }>

type Props = {
    params: Params
    searchParams: { [key: string]: string | string[] | undefined }
}

const alternatesGenerators = new AlternatesGenerators()

const LayoutMetaGenerator = async ({params}: Props): Promise<Metadata> => {

    const { lang } = await params

    const fallbackIcon = '/asset/images/default/favicon.png'
    const { initialSettings } = await getSettings(['initialSettings']);

    const alternates = alternatesGenerators.homePage(lang)

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL as string),
        alternates,
        title: initialSettings?.headDataSettings?.translations?.[lang]?.title ??
               (initialSettings?.headDataSettings?.title || 'CMS'),

        description: initialSettings?.headDataSettings?.translations?.[lang]?.description ??
            (initialSettings?.headDataSettings?.description || 'CMS Description'),
        keywords: initialSettings?.headDataSettings?.translations?.[lang]?.description ??
            (initialSettings?.headDataSettings?.description || 'CMS'),
        icons: {
            icon: initialSettings?.headDataSettings?.favIconUrl || fallbackIcon,
            shortcut: initialSettings?.headDataSettings?.favIconUrl || fallbackIcon,
            apple: initialSettings?.headDataSettings?.favIconUrl || fallbackIcon
        },
        // viewport: {
        //     width: 'device-width',
        //     initialScale: 1,
        //     maximumScale: 1,
        // },
        // themeColor:initialSettings?.headDataSettings?.themeColor || 'black',
        applicationName:initialSettings?.headDataSettings?.siteName,
        openGraph:{
            title: initialSettings?.headDataSettings?.translations?.[lang]?.title ??
                (initialSettings?.headDataSettings?.title || 'CMS'),
            type:'website',
            description:initialSettings?.headDataSettings?.translations?.[lang]?.description ??
                (initialSettings?.headDataSettings?.description || 'CMS Description'),
            images:[initialSettings?.headDataSettings?.favIconUrl || fallbackIcon],

            siteName:initialSettings?.headDataSettings?.siteName,
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