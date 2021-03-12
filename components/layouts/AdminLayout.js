import React, {useEffect, useContext, useState, useRef} from 'react';
import Head from "next/head";
import '../../styles/globalAdminPanel.scss';
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import Loading from "../includes/Loading/Loading";
import {generateAbsolutePath, initGA, logPageView} from '../../_variables/_variables'
import AlertBox from '../includes/AlertBox/AlertBox'
import {getSetting} from '../../_variables/ajaxVariables'
import './AdminLayout.scss'


const Panel = props => {
    const contextData = useContext(AppContext);
    const container = useRef(null);
    const Admin = useRef(null);
    const router = useRouter()

    useEffect(() => {
        if (window.innerWidth > 768) {
            contextData.dispatchSettings(settings => ({
                ...settings,
                adminPanelSideBar: true
            }))
        }

    }, [props]);

    useEffect(() => {
        getSetting('identity', window.location.origin, false, Date.now()).then(identity => {
            contextData.dispatchSiteIdentity({
                ...contextData.siteIdentity,
                ...identity.data.setting.data
            })
        })
        getSetting('design', window.location.origin, false, Date.now()).then(design => {
            contextData.dispatchSiteDesign({
                ...contextData.siteDesign,
                ...design.data.setting.data
            })
        })

    }, []);

    if (contextData.userData.role === 'administrator') {
        return (
            <>
                <Head>
                    <title>Admin Panel</title>
                    <meta name="theme-color" content="#000000"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta charSet="utf-8"/>
                    {/*<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>*/}
                    <link rel="icon" href={contextData.siteIdentity.favIcon || '/static/images/favIcon/favicon.png'}/>
                </Head>
                <AlertBox/>
                <div ref={container} className="container">
                    <TopBar/>
                    <SideBar/>
                    <div ref={Admin} className="Admin">
                        {props.children}
                    </div>
                    <Loading/>
                </div>

            </>
        );
    } else return (
        <h1>Access Denied</h1>
    )

};

export default Panel;
