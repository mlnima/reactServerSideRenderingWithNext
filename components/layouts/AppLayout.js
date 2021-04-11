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
    const router = useRouter()

    const [staticWidgets, setStaticWidgets] = useState({
        topBar: [],
        header: [],
        navigation: [],
        footer: [],
    })
    const [sidebarWidgets, setSidebarWidgets] = useState([])

    const firstLoadWidgets = Object.freeze({
        topBar: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
        header: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
        navigation: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
        footer: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
    })
    const sidebarWidgetsData = props?.widgets ? props.widgets.filter(widget => widget?.data?.position === props.sidebarPosition) : []


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
                topBar: firstLoadWidgets.topBar,
                header: firstLoadWidgets.header,
                navigation: firstLoadWidgets.navigation,
                footer: firstLoadWidgets.footer,
            })
        }

    }, []);

    useEffect(() => {

        if (sidebarWidgetsData.length > 0) {
            setSidebarWidgets(sidebarWidgetsData)
        }
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


    const sidebarPositionName = router.pathname === '/' ? 'homePageSidebar' :
        router.pathname === '/post' ? 'postPageSidebar' :
            router.pathname === '/posts' ? 'postsPageSidebar' :
                router.pathname === '/meta' ? 'metaPageSidebar' :
                    router.pathname === '/page' ? props.pageInfo?.pageName + 'Sidebar' :
                        'homePageSidebar'

    const isWithSidebar = props?.identity?.data?.[sidebarPositionName] || contextData?.siteIdentity[sidebarPositionName] || props?.sidebar


    //<GlobalStyle globalStyleData={props.design?.data?.customStyles || contextData.siteDesign.customStyles || ''}/>
    return (
        <div className={'App ' + (isWithSidebar ? 'withSidebar' : 'withOutSidebar')}>
            {!props.globalStyleDetected ? <GlobalStyle globalStyleData={props.design?.data?.customStyles || contextData.siteDesign.customStyles || ''}/> : null}
            <SiteSettingSetter identity={props.identity || contextData.siteIdentity} design={props.design || contextData.siteDesign} eCommerce={props.eCommerce}/>

            {(!props.referer ? firstLoadWidgets.topBar : staticWidgets.topBar).length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='topBar'
                    widgets={!props.referer ? firstLoadWidgets.topBar : staticWidgets.topBar}
                    className='top-bar'
                    position='topBar'
                    stylesData={props.design?.data?.topBarStyle || contextData.siteDesign.topBarStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    referer={props.referer}
                /> : null
            }
            {(!props.referer ? firstLoadWidgets.header : staticWidgets.header).length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='header'
                    widgets={!props.referer ? firstLoadWidgets.header : staticWidgets.header}
                    className='header' position='header'
                    stylesData={props.design?.data?.headerStyle || contextData.siteDesign.headerStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    referer={props.referer}
                /> : null
            }
            {(!props.referer ? firstLoadWidgets.navigation : staticWidgets.navigation).length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='navigation'
                    widgets={!props.referer ? firstLoadWidgets.navigation : staticWidgets.navigation}
                    className='navigation'
                    position='navigation'
                    stylesData={props.design?.data?.navigationStyle || contextData.siteDesign.navigationStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    referer={props.referer}
                /> : null
            }

            {(!props.referer ? sidebarWidgetsData : sidebarWidgets).length > 0 && isWithSidebar ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='sidebar'
                    // widgets={!props.referer ? sidebarWidgetsData : sidebarWidgets}
                    widgets={!props.referer ? sidebarWidgetsData : sidebarWidgets}
                    className='sidebar '
                    position={sidebarPositionName}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    referer={props.referer}
                /> : null
            }

            {props.children}

            {(!props.referer ? firstLoadWidgets.footer : staticWidgets.footer).length > 0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    widgets={!props.referer ? firstLoadWidgets.footer : staticWidgets.footer}
                    className='footer' position='footer'
                    stylesData={props.design?.data?.footerStyle || contextData.siteDesign.footerStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
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
