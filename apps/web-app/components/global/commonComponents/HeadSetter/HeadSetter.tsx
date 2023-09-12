import {FC, useMemo} from "react";
import Head from 'next/head';
import parse from 'html-react-parser';
import {useRouter} from "next/router";
import {useAppSelector} from "@store_toolkit/hooks";
// import GoogleAnalyticsHeadScript from "@components/global/commonComponents/googleAnalytics/GoogleAnalyticsHeadScripts";

interface PropTypes {
    title?: string,
    description?: string,
    keywords?: string,
    canonicalUrl?: string,
    imageUrl?: string,
    disAllowIndexByRobots?: boolean,
}

const HeadSetter: FC<PropTypes> = (
    {
        title,
        description,
        keywords,
        disAllowIndexByRobots,
        imageUrl,
        canonicalUrl
    }) => {

    const {asPath, locale} = useRouter();
    const headDataSettings = useAppSelector(({settings}) => settings?.initialSettings?.headDataSettings)
    const siteLanguages = process.env.NEXT_PUBLIC_LOCALES?.split(' ') || [];
    const headTitle = useMemo(() => title || headDataSettings?.title || 'Title', [title, asPath])
    const headDescription = useMemo(() => description || headDataSettings?.description || '', [description, asPath])
    const headKeywords = useMemo(() => keywords || headDataSettings?.keywords, [keywords, asPath])

    return (
        <Head>
            <title>{headTitle}</title>
            <meta name="description" content={headDescription}/>
            {!!headKeywords && <meta name="keywords" content={headKeywords}/>}
            <link rel="shortcut icon" href={headDataSettings?.favIconUrl || '/asset/images/default/favicon.png'}/>
            <link rel="apple-touch-icon" href={headDataSettings?.favIconUrl || '/asset/images/default/favicon.png'}/>
            <meta name={'theme-color'} content={headDataSettings?.themeColor || '#000'}/>
            <meta name={'apple-mobile-web-app-status-bar-style'} content={headDataSettings?.themeColor || '#000'}/>
            <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'}/>
            <meta charSet={'utf-8'}/>
            <meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'}/>
            <meta property={'application-name'} content={headDataSettings?.siteName || ''}/>
            <meta property={'og:title'} content={headTitle}/>
            <meta property={'og:type'} content={'website'}/>
            <meta property={'og:description'} content={headDescription}/>
            <meta property={'og:image'} content={imageUrl || '/asset/images/default/favicon.png'}/>
            <meta property={'og:site_name'} content={headDataSettings?.siteName || ''}/>
            <meta property={'og:locale'} content={locale}/>
            <meta property={'twitter:card'} content={'summary_large_image'}/>
            <meta property={'twitter:site'} content={headDataSettings?.siteName || ''}/>
            <meta property={'twitter:title'} content={headTitle}/>
            <meta property={'twitter:description'} content={headDescription}/>
            <meta property={'twitter:image'} content={imageUrl || '/asset/images/default/favicon.png'}/>
            <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${asPath}`}/>

            {!!canonicalUrl && <>
                <link rel={'canonical'} href={canonicalUrl}/>
                <meta property={'twitter:url'} content={canonicalUrl}/>
                <meta property={'og:url'} content={canonicalUrl}/>
            </>}

            {!!headDataSettings?.rtaContent && <meta name={'RATING'} content={'RTA-5042-1996-1400-1577-RTA'}/>}
            {process.env.NEXT_PUBLIC_PWA === 'true' && <link rel="manifest" href={'/manifest.json'}/>}

            {disAllowIndexByRobots && <>
                <meta name="robots" content="noindex"/>
                <meta name="googlebot" content="noindex"/>
            </>}
            {!!(siteLanguages && siteLanguages?.length) &&
                siteLanguages.map((lang, index) => {

                    const languageToRender = lang === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${lang}`
                    const dynamicHref = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${languageToRender}${asPath}`

                    return <link rel="alternate"
                                 hrefLang={lang}
                                 key={index}
                                 href={dynamicHref}
                    />
                })

            }
            {(disAllowIndexByRobots && !!headDataSettings?.customHeadTags) &&
                <>{parse(headDataSettings.customHeadTags, {trim: true})}</>
            }
            {/*{!!headDataSettings.googleAnalyticsId &&*/}
            {/*    <GoogleAnalyticsHeadScript googleAnalyticsId={headDataSettings.googleAnalyticsId}/>}*/}

        </Head>
    )
};
export default HeadSetter;
