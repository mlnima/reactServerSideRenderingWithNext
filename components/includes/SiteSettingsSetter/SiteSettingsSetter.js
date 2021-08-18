import React, {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext';
import Head from 'next/head'
import {useRouter} from "next/router";
import parse from 'html-react-parser';
import {getMultipleSetting} from "../../../_variables/ajaxVariables";
import _ from "lodash";

const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    useEffect(() => {
        props?.design?.data ? (
            contextData.dispatchSiteDesign(props.design?.data),
                contextData.dispatchState({...contextData.state, designSet: true})
        ) : null
        props?.identity?.data ? (
            contextData.dispatchSiteIdentity({...props.identity?.data, isSet: true}),
                contextData.dispatchState({...contextData.state, identitySet: true})
        ) : null
        props?.eCommerce?.data ? contextData.dispatchECommerceSettings(props.eCommerce?.data) : null
        const manuallyDetectedLocale = router.locale ? router.locale :
            router?.query?.locale ? router.query.locale : process.env.REACT_APP_DEFAULT_LOCAL;
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: manuallyDetectedLocale
        })
    }, [props?.design, props?.identity]);

    useEffect(() => {
            !props?.design?.data && !props?.identity?.data && !contextData.state.identitySet && !contextData.state.designSet ? (
                getMultipleSetting({settings: ['identity', 'design']}, process.env.REACT_APP_PRODUCTION_URL, true, 'static').then(res => {
                    const identitySetting = res.data.settings.find(s=>s.type === 'identity')
                    const designSetting = res.data.settings.find(s=>s.type === 'design')
                    contextData.dispatchSiteIdentity({...identitySetting?.data})
                    contextData.dispatchSiteDesign({...designSetting?.data})
                    contextData.dispatchState({...contextData.state, designSet: true, identitySet: true})
                })
            ) : null
    }, []);



    const keywords = (props.identity?.data?.keywords || contextData?.siteIdentity?.keywords || []).map(keyword=>keyword.trim())

    const locals = process.env.REACT_APP_LOCALS.split(' ');
    const localsUrl = locals.map(local=>{
        if (local === process.env.REACT_APP_DEFAULT_LOCAL){
            return <link rel="alternate" hrefLang={local} key={_.uniqueId('link_')} href={`${process.env.REACT_APP_PRODUCTION_URL}/`}/>
        }else return <link rel="alternate" hrefLang={local} key={_.uniqueId('link_')} href={`${process.env.REACT_APP_PRODUCTION_URL}/${local}`}/>
    })

// /post/[postType]/[id]
    return (
        <Head>
            <title>{(props?.identity?.data?.translations?.[router.locale]?.title || contextData?.siteIdentity?.translations?.[router.locale]?.title) || (props.identity?.data?.title || contextData?.siteIdentity?.title) || ''}</title>
            <meta name="theme-color" content={props.identity?.data?.themeColor || contextData?.siteIdentity?.themeColor || '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description"
                  content={(props?.identity?.data?.translations?.[router.locale]?.description || contextData?.siteIdentity?.translations?.[router.locale]?.description) || (props?.identity?.data?.description || contextData?.siteIdentity?.description) || ''}/>
            {props.identity?.data?.keywords?.length > 0 ? <meta name="keywords" content={keywords}/> : null}
            {router.pathname === '/post/[postType]/[id]' ? null : localsUrl}
            <link rel="shortcut icon" href={props?.identity?.data?.favIcon || contextData.siteIdentity.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link rel="apple-touch-icon" href={props?.identity?.data?.favIcon || contextData.siteIdentity.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link rel="manifest" href="/manifest.json"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap" rel="stylesheet"/>
            {props.identity?.data?.customScriptsAsString ? parse(props?.identity?.data?.customScriptsAsString) : null}
            {props?.identity?.data?.siteMode === 'eCommerce' || contextData?.siteIdentity?.siteMode === 'eCommerce' ?
                <script src={`https://www.paypal.com/sdk/js?client-id=${props?.eCommerce?.data?.payPalId}&currency=${props?.eCommerce?.data?.currency}`}/>
                : null
            }
        </Head>
    )
};
export default SiteSettingSetter;

