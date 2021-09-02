import React, {useContext, useEffect, useState, useMemo, useRef} from 'react';
import dynamic from "next/dynamic";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import setSidebarName from '../../_variables/clientVariables/_setSidebarName'
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import TopBarWidgetArea from "../widgetsArea/TopBarWidgetArea/TopBarWidgetArea";
import HeaderWidgetArea from "../widgetsArea/HeaderWidgetArea/HeaderWidgetArea";
import NavigationWidgetArea from "../widgetsArea/NavigationWidgetArea/NavigationWidgetArea";
import SideBarWidgetArea from "../widgetsArea/SideBarWidgetArea/SideBarWidgetArea";
import FooterWidgetArea from "../widgetsArea/FooterWidgetArea/FooterWidgetArea";
import GlobalStyles from "../global/GlobalStyles";

const ConversationsRenderer = dynamic(() => import('../includes/ConversationBox/ConversationsRenderer'), {ssr: false})
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})
const Console = dynamic(() => import('../includes/AdminTools/Console/Console'), {ssr: false})


const AppLayout = props => {

    const contextData = useContext(AppContext);
    const router = useRouter()
    const [leftSidebarWidgets, setLeftSidebarWidgets] = useState([])
    const [rightSidebarWidgets, setRightSidebarWidgets] = useState([])

    const [design, setDesign] = useState(() => {
        return process.env.REACT_APP_SETTING_DESIGN ? JSON.parse(process.env.REACT_APP_SETTING_DESIGN) : {}
    })
    const [identity, setIdentity] = useState(() => {
        return process.env.REACT_APP_SETTING_IDENTITY ? JSON.parse(process.env.REACT_APP_SETTING_IDENTITY) : {}
    })

    const [staticWidgets, setStaticWidgets] = useState(() => {
        return {
            topBar: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
            header: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
            navigation: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
            footer: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
        }
    })

    useEffect(() => {
        setLeftSidebarWidgets(leftSidebarWidgetsData)
        setRightSidebarWidgets(rightSidebarWidgetsData)
    }, [props.widgets]);

    useEffect(() => {
        contextData.dispatchState(prevState => ({
            ...prevState,
            loading: false
        }))

    }, [props]);

    const sidebarPositionName = useMemo(() => setSidebarName(router.pathname, props.pageInfo?.pageName, ''), [router.pathname])

    const leftSidebarPositionName = useMemo(() => setSidebarName(router.pathname, props.pageInfo?.pageName, 'Left'), [router.pathname])

    const rightSidebarPositionName = useMemo(() => setSidebarName(router.pathname, props.pageInfo?.pageName, 'Right'), [router.pathname])


    const sidebarType = useMemo(() => identity?.[sidebarPositionName] || props.pageInfo?.sidebar || 'withOutSidebar', [sidebarPositionName, props.pageInfo])


    const mainLayoutClassNameForGrid = useMemo(() => sidebarType === 'left' ? 'leftSidebar' : sidebarType === 'right' ? 'rightSidebar' : sidebarType === 'both' ? 'bothSidebar' : 'withOutSidebar', [sidebarType]);

    const leftSidebar = useMemo(() => identity?.[sidebarPositionName] === 'both' ||
            identity?.[sidebarPositionName] === 'left' ||
            props.pageInfo?.sidebar === 'both' ||
            props.pageInfo?.sidebar === 'left',
        [sidebarPositionName, props.pageInfo])

    const rightSidebar = useMemo(() => identity?.[sidebarPositionName] === 'both' ||
            identity?.[sidebarPositionName] === 'right' ||
            props.pageInfo?.sidebar === 'both' ||
            props.pageInfo?.sidebar === 'right',
        [sidebarPositionName, props.pageInfo])


    const leftSidebarWidgetsData = useMemo(() => props?.widgets ? props.widgets.filter(widget => widget?.data?.position === leftSidebarPositionName) : [], [router.pathname])
    const rightSidebarWidgetsData = useMemo(() => props?.widgets ? props.widgets.filter(widget => widget?.data?.position === rightSidebarPositionName) : [], [router.pathname])


    const defaultProps = {
        isMobile: props.isMobile,
        postElementSize: design.postElementSize || contextData.siteDesign.postElementSize,
        postElementStyle: design.postElementStyle || contextData.siteDesign.postElementStyle,
        postElementImageLoader: design.postElementImageLoader || contextData.siteDesign.postElementImageLoader,
        postElementImageLoaderType: design.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader,
        referer: props.referer
    }


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyles colors={design.customColors || ''} globalStyleData={design.customStyles || ''}/>
            <SiteSettingSetter identity={identity} design={design} eCommerce={props.eCommerce}/>
            {staticWidgets.topBar.length > 0 ?
                <TopBarWidgetArea
                    {...defaultProps}
                    key='topBar'
                    widgets={!props.referer ? staticWidgets.topBar : staticWidgets.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={design?.topBarStyle || ''}
                /> : null
            }
            {staticWidgets.header.length > 0 ?
                <HeaderWidgetArea
                    {...defaultProps}
                    key='header'
                    widgets={!props.referer ? staticWidgets.header : staticWidgets.header}
                    className='header' position='header'
                    stylesData={design?.headerStyle || ''}
                /> : null
            }
            {staticWidgets.navigation.length > 0 ?
                <NavigationWidgetArea
                    {...defaultProps}
                    // isMobile={props.isMobile}
                    key='navigation'
                    widgets={!props.referer ? staticWidgets.navigation : staticWidgets?.navigation}
                    className='navigation'
                    position='navigation'
                    stylesData={design?.navigationStyle || ''}
                /> : null
            }

            {(!props.referer ? leftSidebarWidgetsData : leftSidebarWidgets).length > 0 && leftSidebar ?
                <SideBarWidgetArea
                    {...defaultProps}
                    key='leftSidebar'
                    gridArea='leftSidebar'
                    widgets={!props.referer ? leftSidebarWidgetsData : leftSidebarWidgets}
                    className='left-sidebar'
                    position={leftSidebarPositionName}
                /> : null
            }

            {props.children}

            {(!props.referer ? rightSidebarWidgetsData : rightSidebarWidgets).length > 0 && rightSidebar ?
                <SideBarWidgetArea
                    {...defaultProps}
                    key='rightSidebar'
                    gridArea='rightSidebar'
                    widgets={!props.referer ? rightSidebarWidgetsData : rightSidebarWidgets}
                    className='right-sidebar'
                    position={rightSidebarPositionName}
                /> : null
            }
            {staticWidgets.footer.length > 0 ?
                <FooterWidgetArea
                    {...defaultProps}
                    widgets={!props.referer ? staticWidgets.footer : staticWidgets.footer}
                    className='footer' position='footer'
                    stylesData={design?.footerStyle || ''}
                /> : null
            }
            {contextData.userData.role === 'administrator' ? <AdminTools/> : null}
            {contextData.userData.role === 'administrator' && contextData.state.console ? <Console/> : null}
            {contextData.state.loading ? <Loading/> : null}
            {contextData.alert.active && contextData.alert.alertMessage ? <AlertBox/> : null}
            {contextData.conversations.length > 0 ? <ConversationsRenderer/> : null}

        </div>

    );

};

export default AppLayout;
