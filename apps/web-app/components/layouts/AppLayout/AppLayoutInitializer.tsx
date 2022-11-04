import React,{FC} from "react";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import LoadingV2 from "../../global/commonComponents/Loading/Loading";
import GlobalStylesComponent from "../../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../../includes/SiteSettingsSetter/SiteSettingsSetter";
import dynamic from "next/dynamic";
import AdminDataSetter from "../../global/AdminDataSetter";
import AppLayoutAdminDataInitializer from "./AppLayoutAdminDataInitializer";
// const AdminDataSetter = dynamic(() => import('@components/global/AdminDataSetter'));
const HeaderWidgetArea = dynamic(() => import('../../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('../../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('../../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('../../widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const AlertBox = dynamic(() => import('../../includes/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('../../includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const BackToTopButton = dynamic(() => import('../../includes/BackToTopButton/BackToTopButton'), {ssr: false});

interface AppLayoutInitializerPropTypes {
    children:React.ReactNode
}

const AppLayoutInitializer: FC<AppLayoutInitializerPropTypes> = ({children}) => {
    const {
        loggedIn,
        userRole,
        identity,
        cookiePopupMessage,
        loginRegisterFormPopup,
        alert,
    } = useSelector(({user, settings, globalState}: Store) => {
        return {
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
            identity: settings?.identity,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup,
            alert: globalState?.alert,
            cookiePopupMessage: settings?.identity?.cookiePopupMessage
        }
    });
    return (
        <>
            <header>
                {identity?.topbar === 'enable' && <TopBarWidgetArea/>}
                {identity?.header === 'enable' && <HeaderWidgetArea/>}
                {identity?.navigation === 'enable' && <NavigationWidgetArea/>}
            </header>

            <div id={'page'} className={'App'}>
                {children}
            </div>

            {identity?.footer === 'enable' && <FooterWidgetArea/>}
            <BackToTopButton/>

            <LoadingV2/>

            {(typeof window !== 'undefined' && !!cookiePopupMessage && localStorage.cookieAccepted !== 'true') &&
            <CookiePopup/>
            }

            {loginRegisterFormPopup && !loggedIn && <LoginRegisterPopup/>}
            {(!!alert?.active && !!alert?.message) && <AlertBox/>}
            {userRole === 'administrator' && <AppLayoutAdminDataInitializer/>}
            {userRole === 'administrator' && <AdminTools/>}
            <GlobalStylesComponent/>
            <SiteSettingSetter/>
        </>
    )
};
export default AppLayoutInitializer;
