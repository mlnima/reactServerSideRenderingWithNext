import React, {useContext, useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import {initGA, logPageView} from '../../_variables/_variables'
import {createGlobalStyle} from "styled-components";
import WidgetArea from "../widgetsArea/WidgetArea/WidgetArea";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import _ from 'lodash'
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})
const Console = dynamic(() => import('../includes/AdminTools/Console/Console'), {ssr: false})
let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`

//import CardElement from "../includes/CardElement/CardElement";
const AppLayout = props => {
    const contextData = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!window.GA_INITIALIZED) {
                initGA()
                window.GA_INITIALIZED = true
            }
            logPageView()
        }
        if (!props.referer) {
            contextData.setSiteWidgets(props.widgets)
        } else {
           // contextData.setSiteWidgets([...contextData.siteWidgets, ...props.widgets])
            const newWidgetsData  = _.uniqBy([...contextData.siteWidgets, ...props.widgets], '_id');
            //const uniqueWidgetIds = [...new Set(newWidgetsData.map(i=>i._id))]
            contextData.setSiteWidgets(newWidgetsData)
        }

    }, []);

    useEffect(() => {
        contextData.state.loading ?
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            }) : null
    }, [props]);


    useEffect(() => {
        if (props.identity?.data?.developmentMode && contextData?.userData?.role !== 'administrator') {
            router.push('/maintenance')
        }
    }, [contextData.userData]);


    const topBarWidgets = contextData.siteWidgets.filter(widget => widget?.data?.position === 'topBar') || []
    const headerWidgets = contextData.siteWidgets.filter(widget => widget?.data?.position === 'header') || []
    const navigationWidgets = contextData.siteWidgets.filter(widget => widget?.data?.position === 'navigation') || []
    const footerWidgets = contextData.siteWidgets.filter(widget => widget?.data?.position === 'footer') || []
    const sidebarWidgets = contextData.siteWidgets.filter(widget => widget?.data?.position === props.sidebarPosition) || []


    return (
        <div className={'App ' + (props.sidebar ? 'withSidebar' : 'withOutSidebar')}>
            <GlobalStyle globalStyleData={props.design?.data?.customStyles ?? ''}/>
            <SiteSettingSetter identity={props.identity} design={props.design} eCommerce={props.eCommerce}/>

            {topBarWidgets.length > 0 ?
                    <WidgetArea
                        isMobile={props.isMobile}
                        key='topBar'
                        widgets={topBarWidgets}
                        className='top-bar'
                        position='topBar'
                        stylesData={props.design?.data?.topBarStyle}
                        postElementSize={props.design?.data?.postElementSize}
                    /> : null
            }
            {headerWidgets.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='header' widgets={headerWidgets}
                    className='header' position='header'
                    stylesData={props.design?.data?.headerStyle}
                    postElementSize={props.design?.data?.postElementSize}
                /> : null
            }
            {navigationWidgets.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='navigation'
                    widgets={navigationWidgets}
                    className='navigation'
                    position='navigation'
                    stylesData={props.design?.data?.navigationStyle}
                    postElementSize={props.design?.data?.postElementSize}
                /> : null
            }
            {sidebarWidgets.length > 0 && props.sidebar ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='sidebar'
                    widgets={sidebarWidgets}
                    className='sidebar '
                    position={props.sidebarPosition}
                    postElementSize={props.design?.data?.postElementSize}
                /> : null
            }

            {props.children}

            {footerWidgets.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    widgets={footerWidgets}
                    className='footer' position='footer'
                    stylesData={props.design?.data?.footerStyle}
                    postElementSize={props.design?.data?.postElementSize}
                /> : null
            }
            {contextData.userData.role === 'administrator' ? <AdminTools/> : null}
            {contextData.userData.role === 'administrator' && contextData.state.console ? <Console/> : null}
            {contextData.state.loading ? <Loading/> : null}
            {contextData.alert.active && contextData.alert.alertMessage ? <AlertBox/> : null}
        </div>

    );

};

export default AppLayout;
