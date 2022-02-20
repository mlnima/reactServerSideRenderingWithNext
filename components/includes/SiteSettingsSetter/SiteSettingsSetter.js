import {useEffect, useMemo, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";

const ScriptParser = dynamic(() => import('./ScriptParser'))
const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {ssr: false})
const UserAutoLogin = dynamic(() => import('./UserAutoLogin'), {ssr: false})

const SiteSettingSetter = () => {
    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const {locale,pathname} = useRouter()

    const siteSettingSetterData = useSelector((store) => {
        return {
            customScriptsAsString: store?.settings?.identity?.customScriptsAsString,
            googleAnalyticsId: store?.settings?.identity?.googleAnalyticsId,
            themeColor: store?.settings?.identity?.themeColor || '#000000',
            title: store?.settings?.identity?.translations?.[locale]?.title || store?.settings?.identity?.title || '',
            description: store?.settings?.identity?.translations?.[locale]?.description ||
                         store?.settings?.identity?.description || '',
            keywords: (store?.settings?.identity?.translations?.[locale]?.keywords ||
                      store?.settings?.identity?.keywords || []).map(keyword => keyword.trim()),
            favIcon: store?.settings?.identity?.favIcon || '/static/images/favIcon/favicon.png'
        }
    })

    const locals = useMemo(() => process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [], []);

    useEffect(() => {
        if (localStorage?.wt) {
            setRenderAutoLogin(true)
        }
    }, []);

    return (
        <>
            <Head>

                <title>{siteSettingSetterData.title}</title>
                <meta name="description" content={siteSettingSetterData.description}/>
                {siteSettingSetterData.keywords?.length ?
                    <meta name="keywords" content={siteSettingSetterData.keywords}/>
                    : null
                }
                {pathname !== '/post/[postType]/[id]' ?
                    locals.map((local, index) => {
                        const hrefUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/
                                         ${local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : local}`
                        return <link rel="alternate" hrefLang={local} key={index} href={hrefUrl}/>
                    })
                    : null
                }
                <meta name="theme-color" content={siteSettingSetterData.themeColor || '#000000' }/>
                <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link rel="shortcut icon" href={siteSettingSetterData.favIcon}/>
                <link rel="apple-touch-icon" href={siteSettingSetterData.favIcon}/>
                <link rel="manifest" href={'/manifest.json'}/>
                {siteSettingSetterData.customScriptsAsString ?
                    <ScriptParser script={siteSettingSetterData.customScriptsAsString}/>
                    : null
                }

            </Head>
            {siteSettingSetterData.googleAnalyticsId ?
                <GoogleAnalytics googleAnalyticsId={siteSettingSetterData.googleAnalyticsId}/>
                : null
            }
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

