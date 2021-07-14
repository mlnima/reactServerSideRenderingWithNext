import React, {useContext, useEffect, useState, useMemo} from 'react';
import dynamic from "next/dynamic";
import {initGA, logPageView} from '../../_variables/_variables'
import {createGlobalStyle} from "styled-components";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import TopBarWidgetArea from "../widgetsArea/TopBarWidgetArea/TopBarWidgetArea";
import HeaderWidgetArea from "../widgetsArea/HeaderWidgetArea/HeaderWidgetArea";
import NavigationWidgetArea from "../widgetsArea/NavigationWidgetArea/NavigationWidgetArea";
import SideBarWidgetArea from "../widgetsArea/SideBarWidgetArea/SideBarWidgetArea";
import FooterWidgetArea from "../widgetsArea/FooterWidgetArea/FooterWidgetArea";
import GlobalStyles from "../global/GlobalStyles";
import WidgetsRenderer from "../includes/WidgetsRenderer/WidgetsRenderer";

const ConversationsRenderer = dynamic(() => import('../includes/ConversationBox/ConversationsRenderer'), {ssr: false})

const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})
const Console = dynamic(() => import('../includes/AdminTools/Console/Console'), {ssr: false})
let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`


const AppLayout = props => {
    //console.log(props)
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [leftSidebarWidgets, setLeftSidebarWidgets] = useState([])
    const [rightSidebarWidgets, setRightSidebarWidgets] = useState([])

    const [staticWidgets, setStaticWidgets] = useState({
        topBar: [],
        header: [],
        navigation: [],
        footer: [],
    })

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
        setLeftSidebarWidgets(leftSidebarWidgetsData)
        setRightSidebarWidgets(rightSidebarWidgetsData)
    }, [props.widgets]);

    useEffect(() => {
        // router.events.on('routeChangeStart',routeChangedHandler)
        routeChangedHandler()
    }, [props]);

    const routeChangedHandler = ()=>{
        contextData.state.loading ?
            contextData.dispatchState({
                ...contextData.state,
                loading:false
            }):
            null
    }


    const sidebarPositionName = useMemo(() =>
            router.pathname === '/' ? 'homePageSidebar' :
                router.pathname === '/post' ? 'postPageSidebar' :
                    router.pathname === '/posts' ? 'postsPageSidebar' :
                        router.pathname === '/meta' ? 'metaPageSidebar' :
                          router.pathname.includes('/profile')  ? 'profilePageSidebar' :
                          router.pathname === '/user' ? 'userPageSidebar' :
                            router.pathname === '/page' ? props.pageInfo?.pageName + 'Sidebar' :
                                'homePageSidebar'
        , [router.pathname])

    const leftSidebarPositionName = useMemo(() => router.pathname === '/' ? 'homePageLeftSidebar' :
        router.pathname === '/post' ? 'postPageLeftSidebar' :
            router.pathname === '/posts' ? 'postsPageLeftSidebar' :
                router.pathname === '/meta' ? 'metaPageLeftSidebar' :
                    router.pathname.includes('/profile')  ? 'profilePageLeftSidebar' :
                   router.pathname === '/user' ? 'userPageLeftSidebar' :
                    router.pathname === '/page' ? props.pageInfo?.pageName + 'LeftSidebar' :
                        'homePageLeftSidebar', [router.pathname])

    const rightSidebarPositionName = useMemo(() => router.pathname === '/' ? 'homePageRightSidebar' :
        router.pathname === '/post' ? 'postPageRightSidebar' :
            router.pathname === '/posts' ? 'postsPageRightSidebar' :
                router.pathname === '/meta' ? 'metaPageRightSidebar' :
                    router.pathname.includes('/profile')  ? 'profilePageRightSidebar' :
                    router.pathname === '/user' ? 'userPageRightSidebar' :
                      router.pathname === '/page' ? props.pageInfo?.pageName + 'RightSidebar' :
                        'homePageRightSidebar', [router.pathname])

    const sidebarType = useMemo(() => props.identity?.data?.[sidebarPositionName] || contextData?.siteIdentity[sidebarPositionName] || props.pageInfo?.sidebar, [sidebarPositionName, props.pageInfo])

    const mainLayoutClassNameForGrid = useMemo(() => sidebarType === 'left' ? 'leftSidebar' : sidebarType === 'right' ? 'rightSidebar' : sidebarType === 'both' ? 'bothSidebar' : 'withOutSidebar', [sidebarType]);

    const leftSidebar = useMemo(() => props.identity?.data?.[sidebarPositionName] === 'both' ||
        props.identity?.data?.[sidebarPositionName] === 'left' ||
        contextData?.siteIdentity?.[sidebarPositionName] === 'both' ||
        contextData?.siteIdentity?.[sidebarPositionName] === 'left' ||
        props.pageInfo?.sidebar === 'both' ||
        props.pageInfo?.sidebar === 'left',
        [sidebarPositionName, props.pageInfo])

    const rightSidebar = useMemo(() => props.identity?.data?.[sidebarPositionName] === 'both' ||
        props.identity?.data?.[sidebarPositionName] === 'right' ||
        contextData?.siteIdentity?.[sidebarPositionName] === 'both' ||
        contextData?.siteIdentity?.[sidebarPositionName] === 'right' ||
        props.pageInfo?.sidebar === 'both' ||
        props.pageInfo?.sidebar === 'right',
        [sidebarPositionName, props.pageInfo])

//useMemo(()=> ,[router.pathname])


    const firstLoadWidgets = Object.freeze({
        topBar: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
        header: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
        navigation: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
        footer: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
    })
    const leftSidebarWidgetsData = useMemo(() => props?.widgets ? props.widgets.filter(widget => widget?.data?.position === leftSidebarPositionName) : [], [router.pathname])
    const rightSidebarWidgetsData = useMemo(() => props?.widgets ? props.widgets.filter(widget => widget?.data?.position === rightSidebarPositionName) : [], [router.pathname])

    // useEffect(() => {
    //     if (props.identity?.data?.developmentMode && contextData?.userData?.role !== 'administrator') {
    //         router.push('/maintenance')
    //     }
    // }, [contextData.userData]);

    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyle globalStyleData={props.design?.data?.customStyles || contextData?.siteDesign?.customStyles || ''}/>
            <GlobalStyles colors={props.design?.data?.customColors|| contextData?.siteDesign?.customColors || ''}/>
            <SiteSettingSetter identity={props.identity || contextData?.siteIdentity} design={props.design || contextData?.siteDesign} eCommerce={props.eCommerce}/>
            {(!props.referer ? firstLoadWidgets.topBar : staticWidgets.topBar).length > 0 ?
                <TopBarWidgetArea
                    isMobile={props.isMobile}
                    key='topBar'
                    widgets={!props.referer ? firstLoadWidgets.topBar : staticWidgets.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={props.design?.data?.topBarStyle || contextData.siteDesign.topBarStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                    referer={props.referer}
                /> : null
            }
            {(!props.referer ? firstLoadWidgets.header : staticWidgets.header).length > 0 ?
                <HeaderWidgetArea
                    isMobile={props.isMobile}
                    key='header'
                    widgets={!props.referer ? firstLoadWidgets.header : staticWidgets.header}
                    className='header' position='header'
                    stylesData={props.design?.data?.headerStyle || contextData.siteDesign.headerStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                    referer={props.referer}
                /> : null
            }
            {(!props.referer ? firstLoadWidgets.navigation : staticWidgets.navigation).length > 0 ?
                <NavigationWidgetArea
                    isMobile={props.isMobile}
                    key='navigation'
                    widgets={!props.referer ? firstLoadWidgets.navigation : staticWidgets?.navigation}
                    className='navigation'
                    position='navigation'
                    stylesData={props.design?.data?.navigationStyle || contextData.siteDesign?.navigationStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign?.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                    referer={props.referer}
                /> : null
            }

            {(!props.referer ? leftSidebarWidgetsData : leftSidebarWidgets).length > 0 && leftSidebar ?
                <SideBarWidgetArea
                    isMobile={props.isMobile}
                    key='leftSidebar'
                    gridArea='leftSidebar'
                    widgets={!props.referer ? leftSidebarWidgetsData : leftSidebarWidgets}
                    className='left-sidebar'
                    position={leftSidebarPositionName}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                    referer={props.referer}
                /> : null
            }

            {props.children}
            {(!props.referer ? rightSidebarWidgetsData : rightSidebarWidgets).length > 0 && rightSidebar ?
                <SideBarWidgetArea
                    isMobile={props.isMobile}
                    key='rightSidebar'
                    gridArea='rightSidebar'
                    widgets={!props.referer ? rightSidebarWidgetsData : rightSidebarWidgets}
                    className='right-sidebar'
                    position={rightSidebarPositionName}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                    referer={props.referer}
                /> : null
            }
            {(!props.referer ? firstLoadWidgets.footer : staticWidgets.footer).length > 0 ?
                <FooterWidgetArea
                    isMobile={props.isMobile}
                    widgets={!props.referer ? firstLoadWidgets.footer : staticWidgets.footer}
                    className='footer' position='footer'
                    stylesData={props.design?.data?.footerStyle || contextData.siteDesign.footerStyle}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                    referer={props.referer}
                /> : null
            }
            {contextData.userData.role === 'administrator' ? <AdminTools/> : null}
            {contextData.userData.role === 'administrator' && contextData.state.console ? <Console/> : null}
            {contextData.state.loading ? <Loading/> : null}
            {contextData.alert.active && contextData.alert.alertMessage ? <AlertBox/> : null}
            {contextData.conversations.length>0 ? <ConversationsRenderer/> : null }

        </div>

    );

};

export default AppLayout;
