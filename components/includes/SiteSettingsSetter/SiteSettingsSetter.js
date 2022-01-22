import Head from 'next/head'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import parse from 'html-react-parser'

const SiteSettingSetter = () => {
    const router = useRouter()
    const customScriptsAsString = useSelector(store => store?.settings?.identity?.customScriptsAsString)
    const themeColor = useSelector(store => store?.settings?.identity?.themeColor || '#000000')
    const title = useSelector(store => store?.settings?.identity?.translations?.[router.locale]?.title || store?.settings?.identity?.title || '')
    const description = useSelector(store => store?.settings?.identity?.translations?.[router.locale]?.description || store?.settings?.identity?.description || '')
    const keywordsData = useSelector(store => store?.settings?.identity?.translations?.[router.locale]?.keywords || store?.settings?.identity?.keywords || [])
    const favIcon = useSelector(store => store?.settings?.identity?.favIcon || '/static/images/favIcon/favicon.png' )
    const keywords = useMemo(() => keywordsData.map(keyword => keyword.trim()), []);
    const locals = useMemo(() => process.env.NEXT_PUBLIC_LOCALS?.split(' ') || [], []);

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            {keywordsData?.length ? <meta name="keywords" content={keywords}/> : null}
            {router.pathname !== '/post/[postType]/[id]' ?
                locals.map((local, index) => {
                    if (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL) {
                        return <link rel="alternate" hrefLang={local} key={index} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/`}/>
                    } else return <link rel="alternate" hrefLang={local} key={index} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${local}`}/>
                })
                : null
            }
            <meta name="theme-color" content={themeColor}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <link rel="shortcut icon" href={favIcon}/>
            <link rel="apple-touch-icon" href={favIcon}/>
            <link rel="manifest" href={'/manifest.json'}/>
            {customScriptsAsString ? parse(customScriptsAsString) : null}
            {/*{identity?.siteMode === 'eCommerce' ?*/}
            {/*    <script src={`https://www.paypal.com/sdk/js?client-id=${settings.eCommerce?.payPalId}&currency=${settings.eCommerce?.currency}`}/>*/}
            {/*    : null*/}
            {/*}*/}
        </Head>
    )
};
export default SiteSettingSetter;


