import React from 'react';
import Head from 'next/head'
import {useRouter} from "next/router";
import parse from 'html-react-parser';
import {useSelector} from "react-redux";


const SiteSettingSetter = () => {
    const settings = useSelector(state => state.settings)
    const router = useRouter()

    const keywordsData = settings.identity?.translations?.[router.locale]?.keywords || settings.identity?.data?.keywords || [];
    const keywords = keywordsData.map(keyword => keyword.trim())

    const locals = process.env.NEXT_PUBLIC_LOCALS.split(' ');
    const localsUrl = locals.map((local,index) => {
        if (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL) {
            return <link rel="alternate" hrefLang={local} key={index} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/`}/>
        } else return <link rel="alternate" hrefLang={local} key={index} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${local}`}/>
    })

    return (
        <Head>
            <title>{settings?.identity?.translations?.[router.locale]?.title || settings.identity?.title || ''}</title>
            <meta name="theme-color" content={settings.identity?.themeColor || '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={settings.identity?.translations?.[router.locale]?.description || settings.identity?.description || ''}/>
            {settings.identity?.keywords?.length > 0 ? <meta name="keywords" content={keywords}/> : null}
            {router.pathname === '/post/[postType]/[id]' ? null : localsUrl}
            <link rel="shortcut icon" href={settings.identity?.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link rel="apple-touch-icon" href={settings.identity?.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link rel="manifest" href={'/manifest.json'}/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap" rel="stylesheet"/>
            {settings.identity?.customScriptsAsString ? parse(settings.identity?.customScriptsAsString) : null}
            {settings.identity?.siteMode === 'eCommerce' ?
                <script src={`https://www.paypal.com/sdk/js?client-id=${settings.eCommerce?.payPalId}&currency=${settings.eCommerce?.currency}`}/>
                : null
            }
        </Head>
    )
};
export default SiteSettingSetter;



// useEffect(() => {
//
//     if (props.identity) {
//         //dispatch(setSettings(props.identity,'identity'))
//         contextData.dispatchSiteIdentity({...props.identity, isSet: true})
//         contextData.dispatchState({...contextData.state, identitySet: true})
//     }
//
//     props?.identity ? (
//         contextData.dispatchSiteIdentity({...props.identity, isSet: true}),
//             contextData.dispatchState({...contextData.state, identitySet: true})
//     ) : null
//     props?.eCommerce ? contextData.dispatchECommerceSettings(props.eCommerce) : null
//     const manuallyDetectedLocale = router.locale ? router.locale :
//         router?.query?.locale ? router.query.locale : process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
//     contextData.dispatchState({
//         ...contextData.state,
//         activeLanguage: manuallyDetectedLocale
//     })
// }, [props?.design, props?.identity]);

// useEffect(() => {
//     !props?.design && !props?.identity ? (
//         getMultipleSetting({settings: ['identity', 'design']}, true).then(res => {
//             const identitySetting = res.data.settings.find(s => s.type === 'identity')
//             const designSetting = res.data.settings.find(s => s.type === 'design')
//             contextData.dispatchSiteIdentity({...identitySetting?.data})
//             contextData.dispatchSiteDesign({...designSetting?.data})
//             contextData.dispatchState({...contextData.state, designSet: true, identitySet: true})
//         })
//     ) : null
// }, []);
