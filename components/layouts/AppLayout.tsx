import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import GlobalStyles from "../global/Styles/GlobalStyles";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import {autoUserLogin} from "../../store/actions/userActions";
import {setLoading} from "../../store/actions/globalStateActions";

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
    const loggedIn = useSelector((store: StoreTypes) => store?.user?.loggedIn)
    const userRole = useSelector((store: StoreTypes) => store?.user?.userData?.role)
    const design = useSelector((store: StoreTypes) => store?.settings?.design)
    const identity = useSelector((store: StoreTypes) => store?.settings?.identity)
    const loading = useSelector((store: StoreTypes) => store?.globalState?.loading)
    const loginRegisterFormPopup = useSelector((store: StoreTypes) => store?.globalState?.loginRegisterFormPopup)
    const alert = useSelector((store: StoreTypes) => store?.globalState?.alert)
    const router = useRouter()
    const dispatch = useDispatch()

    const sidebarsData = useMemo(() => setAppLayoutDataFromProp(props, router, identity), [router.asPath, router.pathname, userRole])

    const isSidebarLess = useMemo(() => {
        return router.pathname === '/404' || router.pathname === '/500' || router.pathname === '/_error' || router.pathname.includes('/profile');
    }, [router.pathname])

    const mainLayoutClassNameForGrid = useMemo(() => {
        return isSidebarLess ? 'without-sidebar' :
            sidebarsData?.sidebarType === 'left' ? 'left-sidebar' :
                sidebarsData?.sidebarType === 'right' ? 'right-sidebar' :
                    sidebarsData?.sidebarType === 'both' ? 'both-sidebar' :
                        'without-sidebar';
    }, [sidebarsData])

    useEffect(() => {
        loading ? dispatch(setLoading(false)) : null
    }, [router.pathname]);


    useEffect(() => {
        if (localStorage?.wt && !loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, []);

    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyles colors={design?.customColors || ''}
                          globalStyleData={design?.customStyles || ''}
                          sideBarWidth={design?.sideBarWidth || 320}
            />
            <SiteSettingSetter/>
            {!identity?.topbar || identity?.topbar === 'enable' ? <TopBarWidgetArea/> : null}
            {!identity?.header || identity?.header === 'enable' ? <HeaderWidgetArea/> : null}
            {!identity?.navigation || identity?.navigation === 'enable' ? <NavigationWidgetArea/> : null}
            {sidebarsData?.leftSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='leftSidebar'
                    className='left-sidebar'
                    position={sidebarsData?.leftSidebar?.name}
                />
                : null
            }

            {props.children}

            {sidebarsData?.rightSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='rightSidebar'
                    className='right-sidebar'
                    position={sidebarsData?.rightSidebar?.name}
                />
                : null
            }
            {!identity?.footer || identity?.footer === 'enable' ? <FooterWidgetArea/> : null}
            {loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/> : null}
            {userRole === 'administrator' ? <AdminTools/> : null}
            {loading ? <Loading/> : null}
            {alert?.active && alert?.message ? <AlertBox/> : null}
            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }
            {userRole === 'administrator' ? <AdminDataSetter/> : null}
        </div>

    );

};

export default AppLayout;

