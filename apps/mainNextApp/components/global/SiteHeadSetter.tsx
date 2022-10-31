import {FC,  useMemo} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import parse from 'html-react-parser'
import {Store} from "typescript-types";

const SiteHeadSetter: FC = () => {
    const {asPath,pathname,query} = useRouter();
    const siteLanguages = useMemo(() => process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [], []);

    const headDataFromStore = useSelector(({globalState}: Store) => globalState?.headData)

    const headData = useMemo(()=>{
        return headDataFromStore
    },[asPath,pathname,query,headDataFromStore])

    return (
        <Head >
            {!!headData?.title && <title>{headData.title}</title>}
            {(!!headData?.description && typeof headData.description === 'string') &&
                <meta name="description" content={headData.description}/>
            }
            {(!!headData?.keywords && headData?.keywords?.length) &&
                <meta name="keywords" content={headData.keywords?.join(' , ')}/>
            }
            <link rel="shortcut icon" href={headData?.favIcon}/>
            <link rel="apple-touch-icon" href={headData?.favIcon}/>
            {process.env.NEXT_PUBLIC_PWA === 'true' && <link rel="manifest" href={'/manifest.json'}/>}
            <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${asPath}`}/>
            {(!!siteLanguages && siteLanguages?.length) &&
                siteLanguages.map((lang, index) => {

                    const languageToRender = lang === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : `/${lang}`
                    const dynamicHref = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${languageToRender}${asPath}`

                    return <link rel="alternate"
                                 hrefLang={lang}
                                 key={index}
                                 href={dynamicHref}
                    />
                })

            }
            <meta name={'theme-color'} content={headData?.themeColor}/>
            {!!headData?.canonicalUrl &&  <link rel={'canonical'} href={headData?.canonicalUrl}/>}
            <meta name={'apple-mobile-web-app-status-bar-style'} content={headData?.themeColor}/>
            <meta name={'viewport'} content={'width=device-width, initial-scale=1'}/>
            <meta charSet={'utf-8'}/>
            <meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'}/>
            {!!headData?.applicationName && <meta property={'application-name'} content={headData?.applicationName}/>}

            {!!headData?.ogTitle && <meta property={'og:title'} content={headData?.ogTitle}/> }
            {!!headData?.ogType && <meta property={'og:type'} content={headData?.ogType}/>  }
            {!!headData?.ogUrl && <meta property={'og:url'} content={headData?.ogUrl}/>   }
            {(!!headData?.ogDescription && typeof headData.ogDescription === 'string')  &&
                <meta property={'og:description'} content={headData?.ogDescription}/>
                 }
            {!!headData?.ogImage && <meta property={'og:image'} content={headData?.ogImage}/>  }
            {(!headData?.ogImage && !!headData?.ogTitle )&&
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/og?title=${headData?.ogTitle}`}
                />
            }
            {!!headData?.ogSiteName && <meta property={'og:site_name'} content={headData?.ogSiteName}/>   }
            {!!headData?.ogLocale && <meta property={'og:locale'} content={headData?.ogLocale}/> }

            {!!headData?.twitterCard && <meta property={'twitter:card'} content={'summary_large_image'}/> }
            {!!headData?.twitterSite && <meta property={'twitter:site'} content={headData?.twitterSite}/> }
            {!!headData?.twitterUrl && <meta property={'twitter:url'} content={headData?.twitterUrl}/> }
            {!!headData?.twitterTitle && <meta property={'twitter:title'} content={headData?.twitterTitle}/> }
            {(!!headData?.twitterDescription && typeof headData.twitterDescription === 'string') &&
                <meta property={'twitter:description'} content={headData?.twitterDescription}/> }
            {!!headData?.twitterImage && <meta property={'twitter:image'} content={headData?.twitterImage}/> }
            {!!headData?.rtaContent && <meta name={'RATING'} content={'RTA-5042-1996-1400-1577-RTA'}/>   }
            {!!headData?.customScriptsAsString && <>{parse(headData.customScriptsAsString,{trim:true})}</>  }

        </Head>
    )
};
export default SiteHeadSetter
