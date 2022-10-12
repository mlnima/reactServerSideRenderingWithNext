import React,{FC} from "react";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import LoadingV2 from "@components/global/commonComponents/Loading/Loading";
import GlobalStylesComponent from "@components/global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "@components/includes/SiteSettingsSetter/SiteSettingsSetter";
import dynamic from "next/dynamic";
// const AdminDataSetter = dynamic(() => import('@components/global/AdminDataSetter'));
const HeaderWidgetArea = dynamic(() => import('@components/widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('@components/widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('@components/widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('@components/widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const AlertBox = dynamic(() => import('@components/includes/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('@components/includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('@components/includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('@components/includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const BackToTopButton = dynamic(() => import('@components/includes/BackToTopButton/BackToTopButton'), {ssr: false});

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
            {/*{userRole === 'administrator' && <AdminDataSetter/>}*/}
            {userRole === 'administrator' && <AdminTools/>}
            <GlobalStylesComponent/>
            <SiteSettingSetter/>
        </>
    )
};
export default AppLayoutInitializer;
