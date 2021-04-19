import React, {useEffect, useContext, useState, useRef} from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
const Loading = dynamic(() => import('../includes/Loading/Loading'),{ ssr: false })
import Link from "next/link";
import {generateAbsolutePath, initGA, logPageView} from '../../_variables/_variables'
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'),{ ssr: false })
import {getSetting} from '../../_variables/ajaxVariables'
import AdminFooter from "../adminIncludes/AdminFooter/AdminFooter";




const AdminLayout = props => {
    const contextData = useContext(AppContext);
    const container = useRef(null);
    const Admin = useRef(null);
    const router = useRouter()

    useEffect(() => {
          setTimeout(()=>openSidebarIfDeviceIsDesktop(),0)
    }, []);

    const openSidebarIfDeviceIsDesktop = ()=>{
        if (window.innerWidth > 768) {
            contextData.dispatchSettings(settings => ({
                ...settings,
                adminPanelSideBar: true
            }))
        }
    }



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
                </Head>
                <div ref={container} className="admin-container">
                    <TopBar/>
                    <SideBar/>
                    <div ref={Admin} className="Admin">
                        {props.children}
                    </div>
                    <AdminFooter/>
                </div>

                {contextData.alert.active && contextData.alert.alertMessage  ?  <AlertBox/> : null }
                {contextData.state.loading  ?   <Loading/> : null }
            </>
        );
    } else return (
        <div id='access-denied-admin'>
        <h1>
            <Link href='/login'>
                <a>403 Forbidden</a>
            </Link>
        </h1>
        </div>
    )

};

export default AdminLayout;
