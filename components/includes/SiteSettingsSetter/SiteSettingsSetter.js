import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../../context/AppContext'
import Head from 'next/dist/next-server/lib/head'
import AppLayout from '../../layouts/AppLayout'
import withRouter from 'next/dist/client/with-router'

const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const customScriptElement = useRef(null)
    const [ state, setState ] = useState({
        title: '',
        themeColor: '',
        description: '',
        bodyBackgroundImage: '',
        keywords: [],
        customScripts: []
        // customScript: props.identity.data.customScript || 'your Script will be here',
    });

    // useEffect(() => {
    //     console.log(props)
    //
    // }, [ props ]);

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
                title: props.identity.data.title || '',
                themeColor: props.design.data.themeColor || '',
                description: props.identity.data.description || '',
                bodyBackgroundImage: props.identity.data.bodyBackgroundImage || '',
                keywords: props.identity.data.keywords || [],
                customScripts: props.identity.customScripts || []
            })
        }
        if (props.widgets) {
            contextData.setSiteWidgets(props.widgets)
        }

    }, [ props ]);

    useEffect(() => {
        document.body.style.backgroundColor = contextData.siteDesign.bodyBackgroundColor
        document.body.style.color = contextData.siteDesign.bodyBackgroundColor
    }, [ contextData.siteDesign ]);

    const renderCustomScripts = (state.customScripts || []).map(script => {
        return (
            <script key={ script.scriptName }>
                { script.scriptBody }
            </script>
        )
    })

    useEffect(() => {
        if (state.bodyBackgroundImage){
            document.querySelector('body').style.backgroundImage = state.bodyBackgroundImage
        }
    }, [state]);

    // const RenderGoogleAnalyticsScript = () => {
    //     if (props.identity.data.googleAnalyticsID) {
    //         console.log('there is')
    //         return (
    //             <>
    //                 <script dangerouslySetInnerHTML={ {
    //                     __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //                     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //                     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //                     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //                   })(window,document,'script','dataLayer',${ props.identity.data.googleAnalyticsID });`
    //                 } }/>
    //             </>
    //
    //         )
    //     } else return null
    // }

    useEffect(() => {
        googleAnalyticsHandler()
    }, [ props.router ]);

    const googleAnalyticsHandler = () => {
        window.dataLayer = window.dataLayer || [];
        const gTag = () => {
            dataLayer.push(arguments)
        }
        gTag('js', new Date())
        gTag('config', contextData.siteIdentity.googleAnalyticsID)
    }

    return (
        <Head>
            <title>{ state.title }</title>
            <meta name="theme-color" content={ state.themeColor }/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            {/*<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>*/ }
            <meta name="description" content={ state.description }/>
            <meta name="keywords" content={ state.keywords }/>
            {/*<GoogleAnalyticsScript/>*/ }
            <script async src={ `https://www.googletagmanager.com/gtag/js?id=${ contextData.siteIdentity.googleAnalyticsID || '' }` }/>
            <link rel="icon" href="/favicon.ico"/>
            <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href='/static/style-sheet/customStyle.css'/>
            { renderCustomScripts }
        </Head>
    )
};
export default withRouter(SiteSettingSetter);

