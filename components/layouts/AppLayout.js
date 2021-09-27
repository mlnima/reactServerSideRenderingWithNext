import React, {useContext, useEffect, useState, useMemo} from 'react';
import dynamic from "next/dynamic";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import GlobalStyles from "../global/GlobalStyles";
//import _getMultipleWidgets from "../../_variables/adminAjaxVariables/adminAjaxWidgetsVariables/_getMultipleWidgets";
import {useDispatch, useSelector} from 'react-redux';
import {autoUserLogin} from "../../store/actions/userActions";
import {setLoading} from "../../store/actions/globalStateActions";
//import {setWidgets} from "../../store/actions/widgetsActions";

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

    const dispatch = useDispatch()

    const userData = useSelector(state => state.user.userData)
    const globalState = useSelector(state => state.globalState)

    // const loggedIn = useSelector(state => state.user.loggedIn)
    // const widgets =  useSelector(state => state.widgets)
    // useEffect(() => {
    //     const widgets = process.env.NEXT_PUBLIC_STATIC_WIDGETS ? JSON.parse(process.env.NEXT_PUBLIC_STATIC_WIDGETS) : props.widgets ? props.widgets : []
    //     dispatch(setWidgets(
    //         {
    //             topBar: widgets ? widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
    //             header: widgets ? widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
    //             navigation: widgets ? widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
    //             footer: widgets ? widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
    //         }
    //     ))
    // }, []);

    // useEffect(() => {
    //     console.log(widgets)
    // }, [widgets]);


    const [sidebarsData, setSidebarsData] = useState(() => setAppLayoutDataFromProp(props, router))
    const [staticWidgets, setStaticWidgets] = useState(() => {
        const widgets = process.env.NEXT_PUBLIC_STATIC_WIDGETS ? JSON.parse(process.env.NEXT_PUBLIC_STATIC_WIDGETS) : props.widgets ? props.widgets : []
        return {
            topBar: widgets ? widgets.filter(widget => widget?.data?.position === 'topBar') || [] : [],
            header: widgets ? widgets.filter(widget => widget?.data?.position === 'header') || [] : [],
            navigation: widgets ? widgets.filter(widget => widget?.data?.position === 'navigation') || [] : [],
            footer: widgets ? widgets.filter(widget => widget?.data?.position === 'footer') || [] : [],
        }
    })


    useEffect(() => {
        setSidebarsData(() => setAppLayoutDataFromProp(props, router))
    }, [router.pathname]);

    useEffect(() => {
        dispatch(setLoading(false))
    }, [props]);

    const isSidebarLess = router.pathname === '/404' || router.pathname === '/500' || router.pathname === '/_error' || router.pathname.includes('/profile') ;
    const mainLayoutClassNameForGrid = useMemo(() => isSidebarLess ? 'withOutSidebar' : sidebarsData.sidebarType === 'left' ? 'leftSidebar' : sidebarsData.sidebarType === 'right' ? 'rightSidebar' : sidebarsData.sidebarType === 'both' ? 'bothSidebar' : 'withOutSidebar', [sidebarsData.sidebarType]);
    const defaultProps = {
        isMobile: props.isMobile,
        postElementSize: props.design?.postElementSize || contextData.siteDesign?.postElementSize,
        postElementStyle: props.design?.postElementStyle || contextData.siteDesign.postElementStyle,
        postElementImageLoader: props.design?.postElementImageLoader || contextData.siteDesign.postElementImageLoader,
        postElementImageLoaderType: props.design?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader,
        referer: props.referer
    }

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(autoUserLogin(['username','role','keyMaster','profileImage','followingCount','followersCount']))
        }
    }, []);


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyles colors={props.design?.customColors || ''} globalStyleData={props.design?.customStyles || ''}/>
            <SiteSettingSetter identity={props.identity} design={props.design} eCommerce={props.eCommerce}/>
            {staticWidgets.topBar.length > 0 ?
                <TopBarWidgetArea
                    {...defaultProps}
                    key='topBar'
                    widgets={staticWidgets.topBar }
                    className='topbar'
                    position='topBar'
                    stylesData={props.design?.topBarStyle || ''}
                /> : null
            }
            {staticWidgets.header.length > 0 ?
                <HeaderWidgetArea
                    {...defaultProps}
                    key='header'
                   // widgets={!props.referer ? staticWidgets.header : staticWidgets.header}
                    widgets={staticWidgets.header}
                    className='header' position='header'
                    stylesData={props.design?.headerStyle || ''}
                /> : null
            }
            {
                staticWidgets.navigation.length > 0 ?
                    <NavigationWidgetArea
                        {...defaultProps}
                        key='navigation'
                        widgets={staticWidgets.navigation}
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
                    widgets={staticWidgets.footer }
                    className='footer' position='footer'
                    stylesData={props.design?.footerStyle || ''}
                /> : null
            }
            {userData?.role === 'administrator' ? <AdminTools/> : null}
            {userData?.role === 'administrator' && contextData.state.console ? <Console/> : null}
            {globalState.loading ? <Loading/> : null}
            {contextData.alert.active && contextData.alert.alertMessage ? <AlertBox/> : null}
        </div>

    );

};

export default AppLayout;
