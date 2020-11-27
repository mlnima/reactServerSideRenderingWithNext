import React, {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext';
import dynamic from 'next/dynamic'
import Head from 'next/dist/next-server/lib/head'

//const reactHtmlParser = dynamic(() => import('html-react-parser'))
import {useRouter} from "next/router";
import parse  from 'html-react-parser';
import {initGA, logPageView} from "../../../_variables/_variables";

const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    useEffect(() => {
        if (props.design) {
            contextData.dispatchSiteDesign(props.design.data)
        }
        if (props.navigation) {
            contextData.dispatchNavigationData(props.navigation.data)
        }
        if (props.identity) {
            contextData.dispatchSiteIdentity(props.identity.data)
        }
        if (props.widgets) {
            contextData.setSiteWidgets(props.widgets)
        }

        if ((localStorage.lang || router.query.lang) && (localStorage.lang || router.query.lang) !== contextData.state.activeLanguage) {
            contextData.dispatchState({
                ...contextData.state,
                activeLanguage: localStorage.lang || router.query.lang
            })
        }

    }, [props]);


    useEffect(() => {
        document.documentElement.lang = contextData.state.activeLanguage === 'default' ? contextData.siteIdentity.defaultSiteLanguage ? contextData.siteIdentity.defaultSiteLanguage : 'en' : contextData.state.activeLanguage
    }, [contextData.state.activeLanguage, contextData.siteIdentity.defaultSiteLanguage]);


    const renderCustomScripts = (props.identity?.data.customScripts ?? []).map(script => {
        return parse(script.scriptBody)
    })

    return (
        <Head>
            <title>{props.identity?.data.title ?? ''}</title>
            <meta name="theme-color" content={props.identity?.data.themeColor ?? '#000000'}/>
            <meta name="apple-mobile-web-app-status-bar-style" content='#000000'/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={props.identity?.data.description ?? ''}/>
            <meta name="keywords" content={props.identity?.data.keywords ?? []}/>
            {/*<base href="/"/>*/}
            <link rel="icon" href={props.identity?.data.favIcon ?? '/static/images/favIcon/favicon.png'}/>
            {/*<link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet"/>*/}
            {renderCustomScripts}

        </Head>
    )
};
export default SiteSettingSetter;

