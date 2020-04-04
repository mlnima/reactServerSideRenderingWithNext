import React, {useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext'
import Head from 'next/dist/next-server/lib/head'
import AppLayout from '../../layouts/AppLayout'

const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        title: props.identity.data.title || '',
        themeColor: props.identity.data.themeColor || '',
        description: props.identity.data.description || '',
        keywords: props.identity.data.keywords || [],
        homePageH1: props.identity.data.homePageH1 || 'H1 element'
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
        }

    }, [props]);

    useEffect(() => {
             document.body.style.backgroundColor= contextData.siteDesign.bodyBackgroundColor
             document.body.style.color = contextData.siteDesign.bodyBackgroundColor
    }, [contextData.siteDesign]);
    return (
        <Head>
            <title>{ state.title }</title>
            <meta name="theme-color" content={ state.themeColor }/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            <meta name="description" content={ state.description }/>
            <meta name="keywords" content={ state.keywords }/>
            <link rel="icon" href="/favicon.ico"/>
            <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet"/>
        </Head>
    )
};
export default SiteSettingSetter;
