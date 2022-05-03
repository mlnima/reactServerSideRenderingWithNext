import {FC} from 'react';
import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import GlobalStylesComponent from "../global/Styles/GlobalStylesComponent";
// import _setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
// import {useRouter} from "next/router";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import SiteSettingSetter from '../includes/SiteSettingsSetter/SiteSettingsSetter'
import LoadingV2 from "@components/includes/LoadingV2/LoadingV2";

// const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SidebarWidgetArea/SidebarWidgetArea'));
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const AdminDataSetter = dynamic(() => import('../global/AdminDataSetter'), {ssr: false});
const BackToTopButton = dynamic(() => import('@components/includes/BackToTopButton/BackToTopButton'), {ssr: false});

// const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false});

interface AppLayoutPropTypes {
    pageInfo?: {},
    children: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {

    // const {pathname} = useRouter();

    const {
        loggedIn,
        userRole,
        identity,
        loginRegisterFormPopup,
        alert,
    } = useSelector(({user, settings, globalState}: StoreTypes) => {
        return {
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
            identity: settings?.identity,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup,
            alert: globalState?.alert,
        }
    });

    return (
        <>
            <GlobalStylesComponent/>
            <SiteSettingSetter/>
            <header>
                {identity?.topbar === 'enable' && <TopBarWidgetArea/>}
                {identity?.header === 'enable' && <HeaderWidgetArea/>}
                {identity?.navigation === 'enable' && <NavigationWidgetArea/>}
            </header>
            <div id={'page'} className={'App'} suppressHydrationWarning>


                {children}

            </div>
            {identity?.footer === 'enable' && <FooterWidgetArea/>}
            <BackToTopButton/>
            {userRole === 'administrator' && <AdminTools/>}
            <LoadingV2/>
            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }
            {/*{loading ? <Loading/> : null}*/}
            {loginRegisterFormPopup && !loggedIn && <LoginRegisterPopup/>}

            {(!!alert?.active && !!alert?.message) && <AlertBox/>}
            {userRole === 'administrator' && <AdminDataSetter userRole={userRole}/>}
        </>
    );
};

export default AppLayout;

// {(sidebarsData?.leftSidebar?.enable && mainLayoutClassNameForGrid !== 'without-sidebar-layout') &&
// <SideBarWidgetArea
//     gridArea='leftSidebar'
//     className='left-sidebar'
//     position={sidebarsData?.leftSidebar?.name}
// />
// }


// {(sidebarsData?.rightSidebar?.enable && mainLayoutClassNameForGrid !== 'without-sidebar-layout') &&
// <SideBarWidgetArea
//     gridArea='rightSidebar'
//     className='right-sidebar'
//     position={sidebarsData?.rightSidebar?.name}
// />
// }