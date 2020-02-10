import React, { useEffect, useContext, useState, useRef } from 'react';
import Head from "next/head";
import './AdminLayout.scss'
import '../../styles/styles.scss';
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import { AppContext } from "../../context/AppContext";
import {withRouter} from "next/router";
import Loading from "../includes/Loading/Loading";

const Panel = props => {
    const contextData = useContext(AppContext);
    const container = useRef(null);
    const Admin = useRef(null);
    const [ state, dispatchState ] = useState({});

    useEffect(() => {
        if (window.innerWidth > 768) {
            contextData.dispatchSettings(settings => ({
                ...settings,
                adminPanelSideBar: true
            }))
        }
    }, []);

    // useEffect(()=>{
    //     if (contextData.userData.role !=='administrator' && props.router.pathname.includes('/admin')){
    //         props.router.push('/')
    //     }
    // },[ props.router]);

    return (
        <>
            <Head>
                <title>Website Title</title>
                <meta name="theme-color" content="#000000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                <meta name="description" content="description of the site"/>
                <meta name="keywords" content="key,word,for,SEO"/>
                /*
                <meta property="og:title" content="The Rock" />
                <meta property="og:type" content="video.movie" />
                <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
                <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />

                https://ogp.me/
                */
            </Head>
            <div ref={ container } className="container">
                <TopBar/>
                <SideBar/>
                <div ref={ Admin } className="Admin">
                    { props.children }
                </div>
                <Loading/>
            </div>

        </>
    );
};

export default withRouter(Panel) ;
