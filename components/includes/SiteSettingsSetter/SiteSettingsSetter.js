import React, {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext';
import Head from 'next/dist/next-server/lib/head'
import {useRouter} from "next/router";
import parse from 'html-react-parser';

const SiteSettingSetter = props => {

    const contextData = useContext(AppContext);
    const router = useRouter()

    useEffect(() => {
        props.design?.data ? contextData.dispatchSiteDesign(props.design?.data) : null
        props.identity?.data ? contextData.dispatchSiteIdentity(props.identity?.data) : null
        props.eCommerce?.data ? contextData.dispatchECommerceSettings(props.eCommerce?.data) : null

        const manuallyDetectedLocale = router.locale ? router.locale :
            router.query.locale ? router.query.locale : process.env.REACT_APP_DEFAULT_LOCAL;

        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: manuallyDetectedLocale
        })
        // !router.locale ? router.locale = manuallyDetectedLocal || process.env.REACT_APP_DEFAULT_LOCAL : null;
        // !router.defaultLocale ? router.defaultLocale = process.env.REACT_APP_DEFAULT_LOCAL : null
        // if (!router.locale) {
        //     router.locale = manuallyDetectedLocal || process.env.REACT_APP_DEFAULT_LOCAL
        //     router.defaultLocale = process.env.REACT_APP_DEFAULT_LOCAL
        //     router.push({pathname: router.pathname, query: router.query}, router.asPath, {locale: manuallyDetectedLocal,defaultLocale:manuallyDetectedLocal})
        // }
    }, []);


    return (
        <Head>
            <title>{props.identity?.data?.translations?.[router.locale]?.title || props.identity?.data?.title || ''}</title>
            <meta name="theme-color" content={props.identity?.data?.themeColor ?? '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={props.identity?.data?.translations?.[router.locale]?.description || props.identity?.data?.description || ''}/>
            <meta name="keywords" content={props.identity?.data.keywords ?? []}/>
            <link rel="icon" href={props.identity?.data.favIcon ?? '/static/images/favIcon/favicon.png'}/>
            {props.identity?.data?.customScriptsAsString ? parse(props.identity?.data?.customScriptsAsString) : null}
            {props?.identity?.data?.siteMode === 'eCommerce' ?
                <script src={`https://www.paypal.com/sdk/js?client-id=${props?.eCommerce?.data?.payPalId}&currency=${props?.eCommerce?.data?.currency}`}/>
                : null
            }
            {(props.identity?.data?.customScripts ?? []).map(script => {
                return parse(script.scriptBody)
            })}


        </Head>
    )
};
export default SiteSettingSetter;

// {props?.eCommerce?.data?.payPalId && props?.eCommerce?.data?.currency && router.pathname === '/checkout' ?
//     <script src={`https://www.paypal.com/sdk/js?client-id=${props?.eCommerce?.data?.payPalId}&currency=${props?.eCommerce?.data?.currency}`}/>
//     : null
// }