import {FC, useEffect, useMemo, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
const ScriptParser = dynamic(() => import('./ScriptParser'))
const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {ssr: false})
const UserAutoLogin = dynamic(() => import('./UserAutoLogin'), {ssr: false})

const SiteSettingSetter : FC = () => {
    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const {locale,pathname} = useRouter()

    const {
        customScriptsAsString,
        googleAnalyticsId,
        themeColor,
        title,
        description,
        keywords,
        favIcon
    } = useSelector(({settings}:StoreTypes) => {
        return {
            customScriptsAsString: settings?.identity?.customScriptsAsString,
            googleAnalyticsId: settings?.identity?.googleAnalyticsId,
            themeColor: settings?.identity?.themeColor || '#000000',
           // title: settings?.identity?.translations?.[locale]?.title || settings?.identity?.title || '',
            title: locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                settings?.identity?.title :
                settings?.identity?.translations?.[locale]?.title || '',
            description: settings?.identity?.translations?.[locale]?.description ||
                         settings?.identity?.description || '',
            keywords: (settings?.identity?.translations?.[locale]?.keywords ||
                      settings?.identity?.keywords || []).map(keyword => keyword.trim()),
            favIcon: settings?.identity?.favIcon || '/static/images/favIcon/favicon.png'
        }
    })

    const languages = useMemo(() => process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [], []);

    useEffect(() => {
        if (localStorage?.wt) {
            setRenderAutoLogin(true)
        }
    }, []);

    return (
        <>
            <Head>

                <title>{title}</title>
                <meta name="description" content={description}/>
                {keywords?.length ? <meta name="keywords" content={keywords?.join(' ')}/> : null}
                {pathname !== '/post/[postType]/[id]' ?
                    languages.map((lang, index) => {
                        return <link rel="alternate"
                                     hrefLang={lang}
                                     key={index}
                                     href={
                                         `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${
                                             lang === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                                                 '' :
                                                 lang
                                         }`
                                     }
                        />
                    })
                    : null
                }
                <meta name="theme-color" content={themeColor || '#000000' }/>
                <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link rel="shortcut icon" href={favIcon}/>
                <link rel="apple-touch-icon" href={favIcon}/>
                <link rel="manifest" href={'/manifest.json'}/>
                {customScriptsAsString ? <ScriptParser script={customScriptsAsString}/> : null}

            </Head>
            {googleAnalyticsId ? <GoogleAnalytics googleAnalyticsId={googleAnalyticsId}/> : null}
            {renderAutoLogin ? <UserAutoLogin renderAutoLogin={renderAutoLogin}/> : null}
        </>
    )
};
export default SiteSettingSetter;


//
// {identity?.siteMode === 'eCommerce' ?
//     <script src={`https://www.paypal.com/sdk/js?client-id=${settings.eCommerce?.payPalId}&currency=${settings.eCommerce?.currency}`}/>
//     : null
// }

