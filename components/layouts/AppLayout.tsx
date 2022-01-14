import React, {useEffect, useState, useMemo} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import GlobalStyles from "../global/Styles/GlobalStyles";
import {useDispatch, useSelector} from 'react-redux';
import {autoUserLogin} from "../../store/actions/userActions";
import {setLoading} from "../../store/actions/globalStateActions";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

const AdminDataSetter = dynamic(() => import('../global/AdminDataSetter'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SideBarWidgetArea/SideBarWidgetArea'))
const SiteSettingSetter = dynamic(() => import('../includes/SiteSettingsSetter/SiteSettingsSetter'))
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'))
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'))
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'))
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'))
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})

const AppLayout = (props: any) => {
    const loggedIn = useSelector((store: StoreTypes) => store?.user.loggedIn)
    const userData = useSelector((store: StoreTypes) => store?.user.userData)
    const globalState = useSelector((store: StoreTypes) => store?.globalState)
    const settings = useSelector((store: StoreTypes) => store?.settings)
    const widgets = useSelector((store: StoreTypes) => store?.widgets?.widgets)
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const sidebarsData = useMemo(() => setAppLayoutDataFromProp(props, router, settings), [router.asPath, router.pathname, isAdmin])

    const isSidebarLess = useMemo(() => {
        return router.pathname === '/404' || router.pathname === '/500' || router.pathname === '/_error' || router.pathname.includes('/profile');
    }, [router.pathname])

    const mainLayoutClassNameForGrid = useMemo(() => {
        return isSidebarLess ? 'withOutSidebar' :
            sidebarsData?.sidebarType === 'left' ? 'leftSidebar' :
                sidebarsData?.sidebarType === 'right' ? 'rightSidebar' :
                    sidebarsData?.sidebarType === 'both' ? 'bothSidebar' :
                        'withOutSidebar';
    }, [sidebarsData])

    const defaultProps = useMemo(() => {
        return {
            postElementSize: settings.design?.postElementSize,
            postElementStyle: settings.design?.postElementStyle,
            postElementImageLoader: settings.design?.postElementImageLoader,
            postElementImageLoaderType: settings.design?.postElementImageLoaderType,
        }
    }, [])


    const widgetsInGroups = useMemo(() => {
        return {
            topBar: widgets ? widgets?.filter(widget => widget?.data?.position === 'topBar') || [] : [],
            header: widgets ? widgets?.filter(widget => widget?.data?.position === 'header') || [] : [],
            navigation: widgets ? widgets?.filter(widget => widget?.data?.position === 'navigation') || [] : [],
            footer: widgets ? widgets?.filter(widget => widget?.data?.position === 'footer') || [] : [],
            [sidebarsData?.leftSidebar?.name]: widgets ? widgets?.filter(widget => widget?.data?.position === sidebarsData?.leftSidebar?.name) || [] : [],
            [sidebarsData?.rightSidebar?.name]: widgets ? widgets?.filter(widget => widget?.data?.position === sidebarsData?.rightSidebar?.name) || [] : [],
        }
    }, [widgets])

    useEffect(() => {
        globalState.loading ?
            dispatch(setLoading(false)) :
            null
    }, [router.pathname]);


    useEffect(() => {
        if (localStorage?.wt && !loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, []);

    // useEffect(() => {
    //     if (!loggedIn && typeof document !== 'undefined') {
    //         document.addEventListener('keydown', e => {
    //             e.metaKey || e.ctrlKey && e.keyCode === 76 ?
    //                 dispatch(setLoginRegisterFormStatus('login')) :
    //                 null
    //         })
    //     }
    //
    //     if (loggedIn && typeof document !== 'undefined' && userData?.role === 'administrator') {
    //         document.addEventListener('keydown', e => {
    //             e.metaKey || e.ctrlKey && e.keyCode === 76 ?
    //                 router.push('/admin') :
    //                 null
    //         })
    //     }
    // }, [loggedIn]);


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            {/*// @ts-ignore*/}
            {userData?.role === 'administrator' ? <AdminDataSetter setIsAdmin={setIsAdmin} LayoutProps={props}/> : null}
            {/*// @ts-ignore*/}
            <GlobalStyles colors={settings.design?.customColors || ''} globalStyleData={settings.design?.customStyles || ''} sideBarWidth={settings?.design?.sideBarWidth || 320}/>
            {/*// @ts-ignore*/}
            <SiteSettingSetter identity={settings.identity} design={settings.design} eCommerce={settings.eCommerce}/>
            {widgetsInGroups.topBar.length ?
                // @ts-ignore
                <TopBarWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={settings.design?.topBarStyle || ''}
                />
                : null}
            {widgetsInGroups.header.length ?
                // @ts-ignore
                <HeaderWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.header}
                    className='header' position='header'
                    stylesData={settings.design?.headerStyle || ''}
                />
                : null}
            {widgetsInGroups.navigation.length ?
                // @ts-ignore
                <NavigationWidgetArea
                    {...defaultProps}
                    className='navigation'
                    position='navigation'
                    stylesData={settings.design?.navigationStyle || ''}
                />
                : null}

            {widgetsInGroups?.[sidebarsData?.leftSidebar?.name]?.length && sidebarsData?.leftSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='leftSidebar'
                    className='left-sidebar'
                    position={sidebarsData?.leftSidebar?.name}
                />
                : null}

            {props.children}

            {widgetsInGroups?.[sidebarsData?.rightSidebar?.name]?.length && sidebarsData?.rightSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='rightSidebar'
                    className='right-sidebar'
                    position={sidebarsData?.rightSidebar?.name}
                />
                : null}
            {widgetsInGroups.footer.length ?
                // @ts-ignore
                <FooterWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.footer}
                    className='footer' position='footer'
                    stylesData={settings.design?.footerStyle || ''}
                />
                : null}
            {globalState?.loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/>:null}
            {userData?.role === 'administrator' ? <AdminTools/> : null}
            {globalState?.loading ? <Loading/> : null}
            {globalState?.alert?.active && globalState?.alert?.message ? <AlertBox/> : null}
            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }
        </div>

    );

};

export default AppLayout;
