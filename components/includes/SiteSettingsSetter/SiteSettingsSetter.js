import React, {useState, useContext, useEffect, useRef} from 'react';
import {AppContext} from '../../../context/AppContext'
import Head from 'next/dist/next-server/lib/head'
import AppLayout from '../../layouts/AppLayout'
import withRouter from 'next/dist/client/with-router'
import withGa from 'next-ga'
import reactHtmlParser from 'html-react-parser'


const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const customScriptElement = useRef(null)
    const [state, setState] = useState({
        title: '',
        themeColor: '',
        description: '',
        bodyBackgroundImage: '',
        keywords: [],
        customScripts: []
        // customScript: props.identity.data.customScript || 'your Script will be here',
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
                customScripts: props.identity ? props.identity.data.customScripts || [] : []
            })
        }
        if (props.widgets) {
            contextData.setSiteWidgets(props.widgets)
        }

    }, [props]);

    useEffect(() => {
        if (props.router) {
            if (localStorage.lang && props.router.lang !== localStorage.lang) {
                const path = {
                    pathname: props.router ? props.router.pathname : '',
                    query: props.router ? {...props.router.query, lang: localStorage.lang} : ''
                }
                props.router.push(path)
            }
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = contextData.siteDesign.bodyBackgroundColor;
        document.body.style.backgroundPosition = contextData.siteDesign.bodyBackgroundPosition || 'center';
        document.body.style.backgroundSize = contextData.siteDesign.bodyBackgroundSize || 'cover';
        document.body.style.backgroundRepeat = contextData.siteDesign.bodyBackgroundRepeat || 'no-repeat';
        document.body.style.backgroundAttachment = contextData.siteDesign.bodyBackgroundAttachment || 'initial';
        document.body.style.backgroundImage = contextData.siteDesign.bodyBackgroundImage ? `url(${contextData.siteDesign.bodyBackgroundImage})` :'none'
        document.body.style.color = contextData.siteDesign.bodyBackgroundColor

    }, [contextData.siteDesign]);

    const renderCustomScripts = (props.identity ? props.identity.data.customScripts || [] : []).map(script => {
        return reactHtmlParser(script.scriptBody)
    })


    return (
        <>
            <Head>
                <title>{state.title}</title>
                <meta name="theme-color" content={state.themeColor}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                {/*<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>*/}
                <meta name="description" content={state.description}/>
                <meta name="keywords" content={state.keywords}/>
                <link rel="icon" href={'/favicon.ico'}/>
                <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" href='/static/style-sheet/customStyle.css'/>
                {renderCustomScripts}
            </Head>

        </>
    )
};
export default withRouter(SiteSettingSetter);

