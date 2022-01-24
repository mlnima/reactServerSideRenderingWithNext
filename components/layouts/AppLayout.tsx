import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import GlobalStyles from "../global/Styles/GlobalStyles";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';

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

interface AppLayoutPropTypes {
    pageInfo?:{},
    children:any
}


const AppLayout : FC<AppLayoutPropTypes> = ({children,pageInfo}) => {

    const pathname = useRouter()?.pathname
    // const asPath = useRouter()?.asPath
    
    const appLayoutData = useSelector((store: StoreTypes) => {
        return {
            loggedIn : store?.user?.loggedIn,
            userRole : store?.user?.userData?.role,
            customColors : store?.settings?.design?.customColors,
            customStyles : store?.settings?.design?.customStyles,
            sideBarWidth : store?.settings?.design?.sideBarWidth,
            identity : store?.settings?.identity,
            loading : store?.globalState?.loading,
            loginRegisterFormPopup : store?.globalState?.loginRegisterFormPopup,
            alert : store?.globalState?.alert,
            sidebarsData: setAppLayoutDataFromProp(pageInfo, pathname,  store?.settings?.identity),
            isSidebarLess: pathname === '/404' || pathname === '/500' || pathname === '/_error' || pathname.includes('/profile'),

        }
    })

    const mainLayoutClassNameForGrid = useMemo(() => {
        return appLayoutData?.isSidebarLess ? 'without-sidebar' :
            appLayoutData?.sidebarsData?.sidebarType === 'left' ? 'left-sidebar' :
                appLayoutData?.sidebarsData?.sidebarType === 'right' ? 'right-sidebar' :
                    appLayoutData?.sidebarsData?.sidebarType === 'both' ? 'both-sidebar' :
                        'without-sidebar';
    }, [appLayoutData?.sidebarsData])


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyles colors={appLayoutData.customColors || ''}
                          globalStyleData={appLayoutData.customStyles || ''}
                          sideBarWidth={appLayoutData.sideBarWidth || 320}
            />
            <SiteSettingSetter/>
            {!appLayoutData.identity?.topbar || appLayoutData.identity?.topbar === 'enable' ? <TopBarWidgetArea/> : null}
            {!appLayoutData.identity?.header || appLayoutData.identity?.header === 'enable' ? <HeaderWidgetArea/> : null}
            {!appLayoutData.identity?.navigation || appLayoutData.identity?.navigation === 'enable' ? <NavigationWidgetArea/> : null}
            {appLayoutData?.sidebarsData?.leftSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='leftSidebar'
                    className='left-sidebar'
                    position={appLayoutData?.sidebarsData?.leftSidebar?.name}
                />
                : null
            }

            {children}

            {appLayoutData?.sidebarsData?.rightSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='rightSidebar'
                    className='right-sidebar'
                    position={appLayoutData?.sidebarsData?.rightSidebar?.name}
                />
                : null
            }
            {!appLayoutData.identity?.footer || appLayoutData.identity?.footer === 'enable' ? <FooterWidgetArea/> : null}
            {appLayoutData.loginRegisterFormPopup && !appLayoutData.loggedIn ? <LoginRegisterPopup/> : null}
            {appLayoutData.userRole === 'administrator' ? <AdminTools/> : null}
            {appLayoutData.loading ? <Loading/> : null}
            {appLayoutData.alert?.active && appLayoutData.alert?.message ? <AlertBox/> : null}
            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }
            {appLayoutData.userRole === 'administrator' ? <AdminDataSetter/> : null}

        </div>

    );

};

export default AppLayout;

