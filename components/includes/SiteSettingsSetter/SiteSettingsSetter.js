import React from 'react';
import Head from 'next/head'
import {useRouter} from "next/router";
import parse from 'html-react-parser';
import {useSelector} from "react-redux";


const SiteSettingSetter = () => {
    const identity = useSelector(store => store?.settings?.identity)
    const router = useRouter()

    const keywordsData = identity?.translations?.[router.locale]?.keywords || identity?.data?.keywords || [];
    const keywords = keywordsData.map(keyword => keyword.trim())

    const locals = process.env.NEXT_PUBLIC_LOCALS.split(' ');
    const localsUrl = locals.map((local,index) => {
        if (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL) {
            return <link rel="alternate" hrefLang={local} key={index} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/`}/>
        } else return <link rel="alternate" hrefLang={local} key={index} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${local}`}/>
    })

    return (
        <Head>
            <title>{identity?.translations?.[router.locale]?.title || identity?.title || ''}</title>
            <meta name="theme-color" content={identity?.themeColor || '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={identity?.translations?.[router.locale]?.description || identity?.description || ''}/>
            {identity?.keywords?.length ? <meta name="keywords" content={keywords}/> : null}
            {router.pathname === '/post/[postType]/[id]' ? null : localsUrl}
            <link rel="shortcut icon" href={identity?.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link rel="apple-touch-icon" href={identity?.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link rel="manifest" href={'/manifest.json'}/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap" rel="stylesheet"/>
            {identity?.customScriptsAsString ? parse(identity?.customScriptsAsString) : null}
            {/*{identity?.siteMode === 'eCommerce' ?*/}
            {/*    <script src={`https://www.paypal.com/sdk/js?client-id=${settings.eCommerce?.payPalId}&currency=${settings.eCommerce?.currency}`}/>*/}
            {/*    : null*/}
            {/*}*/}
        </Head>
    )
};
export default SiteSettingSetter;



