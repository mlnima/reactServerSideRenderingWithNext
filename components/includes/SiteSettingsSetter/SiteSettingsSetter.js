import React, {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext';
import Head from 'next/dist/next-server/lib/head'
import {useRouter} from "next/router";
import parse from 'html-react-parser';

const SiteSettingSetter = props => {
    const router = useRouter()
    const contextData = useContext(AppContext);

    useEffect(() => {
        contextData.dispatchSiteDesign(props.design?.data ?? contextData.siteDesign)
        contextData.dispatchSiteIdentity(props.identity?.data ?? contextData.siteIdentity)
        contextData.dispatchECommerceSettings(props.eCommerce?.data ?? contextData.eCommerceSettings)
        contextData.setSiteWidgets(props.widgets)
        const manuallyDetectedLocal = router.locale ? router.locale :
            router.query.locale ? router.query.locale : process.env.REACT_APP_DEFAULT_LOCAL
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: manuallyDetectedLocal
        })
        router.locale = manuallyDetectedLocal
        router.defaultLocale = process.env.REACT_APP_DEFAULT_LOCAL
        // router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: manuallyDetectedLocal === process.env.REACT_APP_DEFAULT_LOCAL ? false : manuallyDetectedLocal})

    }, []);
    useEffect(() => {
        console.log(contextData.state)
    }, [contextData.state]);

    return (
        <Head>
            <title>{props.identity?.data.title ?? ''}</title>
            <meta name="theme-color" content={props.identity?.data.themeColor ?? '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={props.identity?.data.description ?? ''}/>
            <meta name="keywords" content={props.identity?.data.keywords ?? []}/>
            <link rel="icon" href={props.identity?.data.favIcon ?? '/static/images/favIcon/favicon.png'}/>
            {props.identity.data.siteMode === 'eCommerce' ?
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