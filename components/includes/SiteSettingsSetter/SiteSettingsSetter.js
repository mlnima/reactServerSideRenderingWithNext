import React, {useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext'
import Head from 'next/dist/next-server/lib/head'
import AppLayout from '../../layouts/AppLayout'

const SiteSettingSetter = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        title: props.identity.title || '',
        themeColor: props.identity.themeColor || '',
        description: props.identity.description || '',
        keywords: props.identity.keywords || [],
        homePageH1: props.identity.homePageH1 || 'H1 element'
    });

    useEffect(() => {
        if (props.navigation) {
            contextData.dispatchNavigationData(props.navigation.data)
        }
        if (props.identity) {
            contextData.dispatchSiteIdentity(siteIdentity => ({
                ...siteIdentity,
                ...props.identity
            }))
        }
    }, []);

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
