import React, {useContext, useEffect, useState, useCallback, useMemo} from 'react';
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

const AppLayout = props => {
    const contextData = useContext(AppContext);

    const [staticWidgets, setStaticWidgets] = useState({
        topBar: [],
        header: [],
        navigation: [],
        footer: [],
    })
    const [sidebarWidgets, setSidebarWidgets] = useState([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!window.GA_INITIALIZED) {
                initGA()
                window.GA_INITIALIZED = true
            }
            logPageView()
        }

        if (!props.referer) {
            setStaticWidgets({
                ...staticWidgets,
                topBar: props.widgets.filter(widget => widget?.data?.position === 'topBar') || [],
                header: props.widgets.filter(widget => widget?.data?.position === 'header') || [],
                navigation: props.widgets.filter(widget => widget?.data?.position === 'navigation') || [],
                footer: props.widgets.filter(widget => widget?.data?.position === 'footer') || [],
            })
        }

    }, []);

    useEffect(() => {
        setSidebarWidgets(props.widgets.filter(widget => widget?.data?.position === props.sidebarPosition))
    }, [props.widgets]);

    useEffect(() => {
        contextData.state.loading ?
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            }) : null
    }, [props]);

    // useEffect(() => {
    //     if (props.identity?.data?.developmentMode && contextData?.userData?.role !== 'administrator') {
    //         router.push('/maintenance')
    //     }
    // }, [contextData.userData]);

    return (
        <div className={'App ' + (props.sidebar ? 'withSidebar' : 'withOutSidebar')}>
            <GlobalStyle globalStyleData={props.design?.data?.customStyles ?? ''}/>
            <SiteSettingSetter identity={props.identity} design={props.design} eCommerce={props.eCommerce}/>

            {staticWidgets.topBar.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='topBar'
                    widgets={staticWidgets.topBar}
                    className='top-bar'
                    position='topBar'
                    stylesData={props.design?.data?.topBarStyle}
                    postElementSize={props.design?.data?.postElementSize}
                    referer={props.referer}
                /> : null
            }
            {staticWidgets.header.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='header' widgets={staticWidgets.header}
                    className='header' position='header'
                    stylesData={props.design?.data?.headerStyle}
                    postElementSize={props.design?.data?.postElementSize}
                    referer={props.referer}
                /> : null
            }
            {staticWidgets.navigation.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='navigation'
                    widgets={staticWidgets.navigation}
                    className='navigation'
                    position='navigation'
                    stylesData={props.design?.data?.navigationStyle}
                    postElementSize={props.design?.data?.postElementSize}
                    referer={props.referer}
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
                    referer={props.referer}
                /> : null
            }

            {props.children}

            {staticWidgets.footer.length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    widgets={sidebarWidgets.footer}
                    className='footer' position='footer'
                    stylesData={props.design?.data?.footerStyle}
                    postElementSize={props.design?.data?.postElementSize}
                    referer={props.referer}
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
