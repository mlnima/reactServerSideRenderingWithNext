import {FC,  useMemo} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";
//import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import parse from 'html-react-parser'
//const ScriptParser = dynamic(() => import('../includes/SiteSettingsSetter/ScriptParser'),{ssr:false})

const SiteHeadSetter: FC = () => {
    const {asPath} = useRouter();
    const siteLanguages = useMemo(() => process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [], []);

    const headData = useSelector(({globalState}: StoreTypes) => globalState.headData)

    return (
        <Head >
            {headData.title ? <title>{headData.title}</title> : null}
            {headData.description && typeof headData.description === 'string' ?
                <meta name="description" content={headData.description}/>
                : null
            }
            {headData.keywords && headData.keywords?.length ?
                <meta name="keywords" content={headData.keywords?.join(' , ')}/>
                : null
            }
            <link rel="shortcut icon" href={headData.favIcon}/>
            <link rel="apple-touch-icon" href={headData.favIcon}/>
            {process.env.NEXT_PUBLIC_PWA === 'true' ? <link rel="manifest" href={'/manifest.json'}/>:null}
            <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${asPath}`}/>
            {siteLanguages && siteLanguages?.length ?
                siteLanguages.map((lang, index) => {

                    const languageToRender = lang === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : `/${lang}`
                    const dynamicHref = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${languageToRender}${asPath}`

                    return <link rel="alternate"
                                 hrefLang={lang}
                                 key={index}
                                 href={dynamicHref}
                    />
                })
                : null
            }
            <meta name={'theme-color'} content={headData.themeColor}/>
            {/*{headData.canonical ?  <link rel={'canonical'} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${asPath}`}/> :null}*/}
            {headData.canonicalUrl ?  <link rel={'canonical'} href={headData.canonicalUrl}/> :null}

            <meta name={'apple-mobile-web-app-status-bar-style'} content={headData.themeColor}/>
            <meta name={'viewport'} content={'width=device-width, initial-scale=1'}/>
            <meta charSet={'utf-8'}/>
            <meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'}/>
            {headData?.applicationName? <meta property={'application-name'} content={headData?.applicationName}/>: null}

            {headData?.ogTitle ? <meta property={'og:title'} content={headData?.ogTitle}/> : null }
            {headData?.ogType ? <meta property={'og:type'} content={headData?.ogType}/> : null }
            {headData?.ogUrl ? <meta property={'og:url'} content={headData?.ogUrl}/> : null }
            {headData?.ogDescription && typeof headData.ogDescription === 'string'  ?
                <meta property={'og:description'} content={headData?.ogDescription}/>
                : null }
            {headData?.ogImage ? <meta property={'og:image'} content={headData?.ogImage}/> : null }
            {headData?.ogSiteName ? <meta property={'og:site_name'} content={headData?.ogSiteName}/> : null }
            {headData?.ogLocale? <meta property={'og:locale'} content={headData?.ogLocale}/>: null}

            {headData?.twitterCard? <meta property={'twitter:card'} content={'summary_large_image'}/>: null}
            {headData?.twitterSite? <meta property={'twitter:site'} content={headData?.twitterSite}/>: null}
            {headData?.twitterUrl? <meta property={'twitter:url'} content={headData?.twitterUrl}/>: null}
            {headData?.twitterTitle? <meta property={'twitter:url'} content={headData?.twitterTitle}/>: null}
            {headData?.twitterDescription && typeof headData.twitterDescription === 'string' ?
                <meta property={'twitter:description'} content={headData?.twitterDescription}/>: null}
            {headData?.twitterImage? <meta property={'twitter:image'} content={headData?.twitterImage}/>: null}
            {headData?.rtaContent ? <meta name={'RATING'} content={'RTA-5042-1996-1400-1577-RTA'}/> : null }
            {headData.customScriptsAsString ?<>{parse(headData.customScriptsAsString,{trim:true})}</>  : null}

        </Head>
    )
};
export default SiteHeadSetter
//      {headData.customScriptsAsString ? <ScriptParser script={headData.customScriptsAsString}/> : null}