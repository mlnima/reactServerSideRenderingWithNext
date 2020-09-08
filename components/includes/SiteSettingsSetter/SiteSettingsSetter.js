import React, {useState, useContext, useEffect, useRef} from 'react';
import {AppContext} from '../../../context/AppContext'
import Head from 'next/dist/next-server/lib/head'
import withRouter from 'next/dist/client/with-router'
import reactHtmlParser from 'html-react-parser'
import {useRouter} from "next/router";

const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        title: '',
        themeColor: '',
        description: '',
        bodyBackgroundImage: '',
        keywords: [],
        customScripts: [],
        customStyles: ''
    });

    useEffect(() => {
        if (props.design) {
            contextData.dispatchSiteDesign(props.design.data)
        }
        if (props.navigation) {
            contextData.dispatchNavigationData(props.navigation.data)
        }
        if (props.identity) {
            contextData.dispatchSiteIdentity(props.identity.data)
            setState({
                ...state,
                title: props.identity ? props.identity.data.title || '' : '',
                themeColor: props.design ? props.design.data.themeColor || '' : '',
                description: props.identity ? props.identity.data.description || '' : '',
                bodyBackgroundImage: props.design ? props.design.data.bodyBackgroundImage || '' : '',
                keywords: props.identity ? props.identity.data.keywords || [] : [],
                customScripts: props.identity ? props.identity.data.customScripts || [] : [],
                customStyles: props.design.data.customStyles ? props.design.data.customStyles : '',
                favIcon: props.identity ? props.identity.data.favIcon || '/static/images/favIcon/favicon.png' : '/static/images/favIcon/favicon.png'
            })

        }
        if (props.widgets) {
            contextData.setSiteWidgets(props.widgets)
        }

    }, [props]);


    useEffect(() => {
        if (localStorage.lang || router.query.lang) {
            contextData.dispatchState({
                ...contextData.state,
                activeLanguage: localStorage.lang || router.query.lang
            })
        }
    }, []);


    useEffect(() => {
        document.documentElement.lang = contextData.state.activeLanguage === 'default' ? contextData.siteIdentity.defaultSiteLanguage ? contextData.siteIdentity.defaultSiteLanguage : 'en' : contextData.state.activeLanguage
    }, [contextData.state.activeLanguage, contextData.siteIdentity.defaultSiteLanguage]);


    const renderCustomScripts = (props.identity ? props.identity.data.customScripts || [] : []).map(script => {
        return reactHtmlParser(script.scriptBody)
    })


    return (
        <Head>
            <title>{state.title}</title>
            <meta name="theme-color" content={state.themeColor}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={state.description}/>
            <meta name="keywords" content={state.keywords}/>
            <link rel="icon" href={state.favIcon || '/static/images/favIcon/favicon.png'}/>
            <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet"/>

            {renderCustomScripts}
        </Head>
    )
};
export default withRouter(SiteSettingSetter);

