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
    }, []);


    return (
        <Head>
            <title>{props.identity?.data?.translations?.[router.locale]?.title || props.identity?.data?.title || ''}</title>
            <meta name="theme-color" content={props.identity?.data?.themeColor ?? '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={props.identity?.data?.translations?.[router.locale]?.description || props.identity?.data?.description || ''}/>
            {props.identity?.data.keywords.length>0?<meta name="keywords" content={props.identity?.data.keywords ?? []}/>:null}
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

