import React, {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext';
import Head from 'next/head'
import {useRouter} from "next/router";
import parse from 'html-react-parser';
import {getMultipleSetting} from "../../../_variables/ajaxVariables";
import _ from "lodash";
import {useDispatch} from "react-redux";
import {setSettings} from "../../../store/actions/settingsActions";

const SiteSettingSetter = props => {
    const dispatch = useDispatch()
    const contextData = useContext(AppContext);
    const router = useRouter()

    useEffect(() => {

        if (props.identity){
                //dispatch(setSettings(props.identity,'identity'))
                contextData.dispatchSiteIdentity({...props.identity, isSet: true})
                contextData.dispatchState({...contextData.state, identitySet: true})
        }
        if (props.design){
           // dispatch(setSettings(props.design,'design'))
        }

        // console.log(props)
        // props?.design ? (
        //     contextData.dispatchSiteDesign(props.design),
        //         contextData.dispatchState({...contextData.state, designSet: true})
        // ) : null
        props?.identity ? (
                contextData.dispatchSiteIdentity({...props.identity, isSet: true}),
                contextData.dispatchState({...contextData.state, identitySet: true})
        ) : null
        props?.eCommerce ? contextData.dispatchECommerceSettings(props.eCommerce) : null
        const manuallyDetectedLocale = router.locale ? router.locale :
            router?.query?.locale ? router.query.locale : process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: manuallyDetectedLocale
        })
    }, [props?.design, props?.identity]);

    useEffect(() => {
            !props?.design && !props?.identity ? (
                getMultipleSetting({settings: ['identity', 'design']}, true).then(res => {
                    const identitySetting = res.data.settings.find(s=>s.type === 'identity')
                    const designSetting = res.data.settings.find(s=>s.type === 'design')
                    contextData.dispatchSiteIdentity({...identitySetting?.data})
                    contextData.dispatchSiteDesign({...designSetting?.data})
                    contextData.dispatchState({...contextData.state, designSet: true, identitySet: true})
                })
            ) : null
    }, []);


    const keywordsDataFromProps = props.identity?.translations?.[router.locale]?.keywords  || props.identity?.data?.keywords || [];


    const keywords = keywordsDataFromProps.map(keyword=>keyword.trim())

    const locals = process.env.NEXT_PUBLIC_LOCALS.split(' ');
    const localsUrl = locals.map(local=>{
        if (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL){
            return <link rel="alternate" hrefLang={local} key={_.uniqueId('link_')} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/`}/>
        }else return <link rel="alternate" hrefLang={local} key={_.uniqueId('link_')} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${local}`}/>
    })

// /post/[postType]/[id]
    return (
        <Head>
            <title>{props?.identity?.translations?.[router.locale]?.title || props.identity?.title || ''}</title>
            <meta name="theme-color" content={props.identity?.themeColor || '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={props?.identity?.translations?.[router.locale]?.description || props?.identity?.description || ''}/>
            {props.identity?.keywords?.length > 0 ? <meta name="keywords" content={keywords}/> : null}
            {router.pathname === '/post/[postType]/[id]' ? null : localsUrl}
            <link rel="shortcut icon" href={props?.identity?.favIcon  || '/static/images/favIcon/favicon.png'}/>
            <link rel="apple-touch-icon" href={props?.identity?.favIcon  || '/static/images/favIcon/favicon.png'}/>
            <link rel="manifest" href="/manifest.json"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap" rel="stylesheet"/>
            {props.identity?.customScriptsAsString ? parse(props?.identity?.customScriptsAsString) : null}
            {props?.identity?.siteMode === 'eCommerce'  ?
                <script src={`https://www.paypal.com/sdk/js?client-id=${props?.eCommerce?.payPalId}&currency=${props?.eCommerce?.currency}`}/>
                : null
            }
        </Head>
    )
};
export default SiteSettingSetter;

