import {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import GlobalStyles from "../global/Styles/GlobalStyles";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import {autoUserLogin} from "../../store/actions/userActions";
import {setLoading} from "../../store/actions/globalStateActions";

// const {autoUserLogin} = dynamic(() => import('../../store/actions/userActions'), {ssr: false});
// const {setLoading}  = dynamic(() => import('../../store/actions/globalStateActions'), {ssr: false});

const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SideBarWidgetArea/SideBarWidgetArea'))
const SiteSettingSetter = dynamic(() => import('../includes/SiteSettingsSetter/SiteSettingsSetter'))
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'))
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'))
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'))
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'))
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})
const LoginRegisterPopup = dynamic(() => import('../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const AdminDataSetter = dynamic(() => import('../global/AdminDataSetter'), {ssr: false});

const AppLayout = (props: any) => {
    const loggedIn = useSelector((store: StoreTypes) => store?.user.loggedIn)
    const userRole = useSelector((store: StoreTypes) => store?.user?.userData?.role)
    const design = useSelector((store: StoreTypes) => store?.settings?.design)
    const identity = useSelector((store: StoreTypes) => store?.settings?.identity)
    const widgets = useSelector((store: StoreTypes) => store?.widgets?.widgets)
    const loading = useSelector((store: StoreTypes) => store?.globalState?.loading)
    const loginRegisterFormPopup = useSelector((store: StoreTypes) => store?.globalState?.loginRegisterFormPopup)
    const alert = useSelector((store: StoreTypes) => store?.globalState?.alert)


    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const sidebarsData = useMemo(() => setAppLayoutDataFromProp(props, router, identity), [router.asPath, router.pathname, isAdmin])

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
            postElementSize: design?.postElementSize,
            postElementStyle: design?.postElementStyle,
            postElementImageLoader: design?.postElementImageLoader,
            postElementImageLoaderType: design?.postElementImageLoaderType,
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
            loading?dispatch(setLoading(false)):null
    }, [router.pathname]);


    useEffect(() => {
        if (localStorage?.wt && !loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, []);

    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            {userRole === 'administrator' ? <AdminDataSetter setIsAdmin={setIsAdmin} LayoutProps={props}/> : null}
            <GlobalStyles colors={design?.customColors || ''} globalStyleData={design?.customStyles || ''} sideBarWidth={design?.sideBarWidth || 320}/>
            <SiteSettingSetter />
            {widgetsInGroups.topBar.length ?
                // @ts-ignore
                <TopBarWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={design?.topBarStyle || ''}
                />
                : null}
            {widgetsInGroups.header.length ?
                // @ts-ignore
                <HeaderWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.header}
                    className='header' position='header'
                    stylesData={design?.headerStyle || ''}
                />
                : null}
            {widgetsInGroups.navigation.length ?
                // @ts-ignore
                <NavigationWidgetArea
                    {...defaultProps}
                    className='navigation'
                    position='navigation'
                    stylesData={design?.navigationStyle || ''}
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
                    stylesData={design?.footerStyle || ''}
                />
                : null}
            {loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/>:null}
            {userRole === 'administrator' ? <AdminTools/> : null}
            {loading ? <Loading/> : null}
            {alert?.active && alert?.message ? <AlertBox/> : null}
            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }
        </div>

    );

};

export default AppLayout;
