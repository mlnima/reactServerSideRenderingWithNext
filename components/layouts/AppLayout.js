import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import GlobalStyles from "../global/Styles/GlobalStyles";
import {useDispatch, useSelector} from 'react-redux';
import {autoUserLogin} from "../../store/actions/userActions";
import {setLoading, setLoginRegisterFormStatus} from "../../store/actions/globalStateActions";
import AdminDataSetter from "../global/AdminDataSetter";

const CookiePopup = dynamic(() => import('../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SideBarWidgetArea/SideBarWidgetArea'))
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'))
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'))
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'))
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'))
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})

const AppLayout = props => {
    const loggedIn = useSelector(state => state?.user.loggedIn)
    const userData = useSelector(state => state?.user.userData)
    const globalState = useSelector(state => state?.globalState)
    const settings = useSelector(state => state?.settings)
    const widgets = useSelector(state => state?.widgets?.widgets)
    const router = useRouter()
    const dispatch = useDispatch()
    const [sidebarsData, setSidebarsData] = useState(() => setAppLayoutDataFromProp(props, router, settings))

    const [isSidebarLess, setIsSidebarLess] = useState(() => {
        return router.pathname === '/404' || router.pathname === '/500' || router.pathname === '/_error' || router.pathname.includes('/profile');
    })

    useEffect(() => {
        globalState.loading ?
            dispatch(setLoading(false)) :
            null
    }, [router.pathname]);

    useEffect(() => {
        setSidebarsData(() => {
            return setAppLayoutDataFromProp(props, router, settings)
        })
    }, [router.asPath, router.pathname]);

    const mainLayoutClassNameForGrid = isSidebarLess ? 'withOutSidebar' : sidebarsData.sidebarType === 'left' ? 'leftSidebar' : sidebarsData.sidebarType === 'right' ? 'rightSidebar' : sidebarsData.sidebarType === 'both' ? 'bothSidebar' : 'withOutSidebar';

    const defaultProps = {
        postElementSize: settings.design?.postElementSize,
        postElementStyle: settings.design?.postElementStyle,
        postElementImageLoader: settings.design?.postElementImageLoader,
        postElementImageLoaderType: settings.design?.postElementImageLoaderType,
    }

    useEffect(() => {
        if (localStorage.wt && !userData.loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, []);

    useEffect(() => {
        if (!loggedIn && typeof document !== 'undefined') {
            document.addEventListener('keydown', e => {
                e.metaKey || e.ctrlKey && e.keyCode === 76 ?
                    dispatch(setLoginRegisterFormStatus('login')) :
                    null
            })
        }

        if (loggedIn && typeof document !== 'undefined' && userData.role === 'administrator') {
            document.addEventListener('keydown', e => {
                e.metaKey || e.ctrlKey && e.keyCode === 76 ?
                    router.push('/admin') :
                    null
            })
            document.addEventListener('keydown', e => {
                e.altKey && e.keyCode === 87 ?
                    router.push('/admin/design/widgets') :
                    null
            })
        }
    }, [loggedIn]);

    const widgetsInGroups = {
        topBar: widgets ? widgets?.filter(widget => widget?.data?.position === 'topBar') || [] : [],
        header: widgets ? widgets?.filter(widget => widget?.data?.position === 'header') || [] : [],
        navigation: widgets ? widgets?.filter(widget => widget?.data?.position === 'navigation') || [] : [],
        footer: widgets ? widgets?.filter(widget => widget?.data?.position === 'footer') || [] : [],
        [sidebarsData.leftSidebar.name]: widgets ? widgets?.filter(widget => widget?.data?.position === sidebarsData.leftSidebar.name) || [] : [],
        [sidebarsData.rightSidebar.name]: widgets ? widgets?.filter(widget => widget?.data?.position === sidebarsData.rightSidebar.name) || [] : [],
    }


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <AdminDataSetter/>
            <GlobalStyles colors={settings.design?.customColors || ''} globalStyleData={settings.design?.customStyles || ''}/>
            <SiteSettingSetter identity={settings.identity} design={settings.design} eCommerce={settings.eCommerce}/>
            {widgetsInGroups.topBar.length > 0 ?
                <TopBarWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={settings.design?.topBarStyle || ''}
                />
                : null}
            {widgetsInGroups.header.length > 0 ?
                <HeaderWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.header}
                    className='header' position='header'
                    stylesData={settings.design?.headerStyle || ''}
                />
                : null}
            {widgetsInGroups.navigation.length > 0 ?
                <NavigationWidgetArea
                    {...defaultProps}
                    className='navigation'
                    position='navigation'
                    stylesData={settings.design?.navigationStyle || ''}
                />
                : null}

            {widgetsInGroups?.[sidebarsData.leftSidebar.name]?.length > 0 && sidebarsData?.leftSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='leftSidebar'
                    className='left-sidebar'
                    position={sidebarsData.leftSidebar.name}
                />
                : null}

            {props.children}

            {widgetsInGroups?.[sidebarsData.rightSidebar.name]?.length > 0 && sidebarsData?.rightSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='rightSidebar'
                    className='right-sidebar'
                    position={sidebarsData.rightSidebar.name}
                />
                : null}
            {widgetsInGroups.footer.length > 0 ?
                <FooterWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.footer}
                    className='footer' position='footer'
                    stylesData={settings.design?.footerStyle || ''}
                />
                : null}
            {userData?.role === 'administrator' ? <AdminTools/> : null}
            {globalState?.loading ? <Loading/> : null}
            {globalState?.alert?.active && globalState?.alert?.message ? <AlertBox/> : null}
            { typeof window !== 'undefined'? localStorage.cookieAccepted !== 'true'?
                <CookiePopup/>
                :null :null
            }
        </div>

    );

};

export default AppLayout;
