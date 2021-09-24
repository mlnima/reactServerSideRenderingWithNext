import React, {useContext, useEffect, useState, useMemo} from 'react';
import dynamic from "next/dynamic";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import setSidebarName from '../../_variables/clientVariables/_setSidebarName'
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import GlobalStyles from "../global/GlobalStyles";

const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SideBarWidgetArea/SideBarWidgetArea'))
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'))
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'))
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'))
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'))
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})
const Console = dynamic(() => import('../includes/AdminTools/Console/Console'), {ssr: false})

const AppLayout = props => {

    const contextData = useContext(AppContext);
    const router = useRouter()

    const setDataFromProps = () => {
        const leftSidebarName = setSidebarName(router.pathname, props.pageInfo?.pageName, 'Left')
        const rightSidebarName = setSidebarName(router.pathname, props.pageInfo?.pageName, 'Right')
        const sidebarPositionName = setSidebarName(router.pathname, props.pageInfo?.pageName, '')

        return {
            sidebarPositionName,
            leftSidebar: {
                enable: props.identity?.[sidebarPositionName] === 'both' ||
                    props.identity?.[sidebarPositionName] === 'left' ||
                    props.pageInfo?.sidebar === 'both' ||
                    props.pageInfo?.sidebar === 'left',
                name: leftSidebarName,
                widgets: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === leftSidebarName) : []
            },
            rightSidebar: {
                enable: props.identity?.[sidebarPositionName] === 'both' ||
                    props.identity?.[sidebarPositionName] === 'right' ||
                    props.pageInfo?.sidebar === 'both' ||
                    props.pageInfo?.sidebar === 'right',
                name: rightSidebarName,
                widgets: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === rightSidebarName) : []
            }
        }
    }

    const [sidebarsData, setSidebarsData] = useState(() => setDataFromProps())

    useEffect(() => {
        setSidebarsData(() => setDataFromProps())
        // console.log( JSON.parse(process.env.NEXT_PUBLIC_STATIC_WIDGETS)   )
        // contextData.state.loading

    }, [router.pathname]);


    const [staticWidgets, setStaticWidgets] = useState(() => {
        const widgets = process.env.NEXT_PUBLIC_STATIC_WIDGETS? JSON.parse(process.env.NEXT_PUBLIC_STATIC_WIDGETS) :[]
        // return {
        //     topBar: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
        //     header: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
        //     navigation: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
        //     footer: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
        // }
        return {
            topBar:      widgets ? widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
            header:      widgets ? widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
            navigation:  widgets ? widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
            footer:      widgets ? widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
        }
    })

    useEffect(() => {
        contextData.dispatchState(prevState => ({
            ...prevState,
            loading: false
        }))

    }, [props]);


    const sidebarType = useMemo(() => props.identity?.[sidebarsData.sidebarPositionName] || props.pageInfo?.sidebar || 'withOutSidebar', [sidebarsData.sidebarPositionName, props.pageInfo])

    const isErrorPage = router.pathname === '/404' || router.pathname === '/500' || router.pathname === '/_error'

    const mainLayoutClassNameForGrid = useMemo(() => isErrorPage ? 'withOutSidebar' : sidebarType === 'left' ? 'leftSidebar' : sidebarType === 'right' ? 'rightSidebar' : sidebarType === 'both' ? 'bothSidebar' : 'withOutSidebar', [sidebarType]);


    const defaultProps = {
        isMobile: props.isMobile,
        postElementSize: props.design?.postElementSize || contextData.siteDesign?.postElementSize,
        postElementStyle: props.design?.postElementStyle || contextData.siteDesign.postElementStyle,
        postElementImageLoader: props.design?.postElementImageLoader || contextData.siteDesign.postElementImageLoader,
        postElementImageLoaderType: props.design?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader,
        referer: props.referer
    }


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyles colors={props.design?.customColors || ''} globalStyleData={props.design?.customStyles || ''}/>
            <SiteSettingSetter identity={props.identity} design={props.design} eCommerce={props.eCommerce}/>
            {staticWidgets.topBar.length > 0 ?
                <TopBarWidgetArea
                    {...defaultProps}
                    key='topBar'
                    widgets={!props.referer ? staticWidgets.topBar : staticWidgets.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={props.design?.topBarStyle || ''}
                /> : null
            }
            {staticWidgets.header.length > 0 ?
                <HeaderWidgetArea
                    {...defaultProps}
                    key='header'
                    widgets={!props.referer ? staticWidgets.header : staticWidgets.header}
                    className='header' position='header'
                    stylesData={props.design?.headerStyle || ''}
                /> : null
            }
            {
                staticWidgets.navigation.length > 0 ?
                    <NavigationWidgetArea
                        {...defaultProps}
                        key='navigation'
                        widgets={!props.referer ? staticWidgets.navigation : staticWidgets?.navigation}
                        className='navigation'
                        position='navigation'
                        stylesData={props.design?.navigationStyle || ''}
                    /> : null
            }

            {
                sidebarsData.leftSidebar.widgets.length > 0 && sidebarsData.leftSidebar.enable ?
                    <SideBarWidgetArea
                        {...defaultProps}
                        key='leftSidebar'
                        gridArea='leftSidebar'
                        widgets={sidebarsData.leftSidebar.widgets}
                        className='left-sidebar'
                        position={sidebarsData.leftSidebar.name}
                    /> : null
            }

            {props.children}

            {
                sidebarsData.rightSidebar.widgets.length > 0 && sidebarsData.rightSidebar.enable ?
                    <SideBarWidgetArea
                        {...defaultProps}
                        key='rightSidebar'
                        gridArea='rightSidebar'
                        widgets={sidebarsData.rightSidebar.widgets}
                        className='right-sidebar'
                        position={sidebarsData.rightSidebar}
                    /> : null
            }
            {staticWidgets.footer.length > 0 ?
                <FooterWidgetArea
                    {...defaultProps}
                    widgets={!props.referer ? staticWidgets.footer : staticWidgets.footer}
                    className='footer' position='footer'
                    stylesData={props.design?.footerStyle || ''}
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
