import React, { useEffect, useContext, useState, useRef } from 'react';
import Head from "next/head";
import '../../styles/styles.scss';
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import { AppContext } from "../../context/AppContext";
import { withRouter } from "next/router";
import Loading from "../includes/Loading/Loading";
import { generateAbsolutePath } from '../../_variables/_variables'

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
                <title>Admin Panel</title>
                <meta name="theme-color" content="#000000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                <link rel="icon" href="/favicon.ico"/>
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

export default withRouter(Panel);
