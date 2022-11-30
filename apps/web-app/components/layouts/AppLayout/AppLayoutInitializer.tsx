import React,{FC} from "react";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Loading from "../../global/commonComponents/Loading/Loading";
import GlobalStylesComponent from "../../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../../includes/SiteSettingsSetter/SiteSettingsSetter";
import dynamic from "next/dynamic";
import styled from "styled-components";
// import AdminDataSetter from "../../global/AdminDataSetter";
import AppLayoutAdminDataInitializer from "./AppLayoutAdminDataInitializer";
import {closeAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
// const AdminDataSetter = dynamic(() => import('@components/global/AdminDataSetter'));
const HeaderWidgetArea = dynamic(() => import('../../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('../../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('../../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('../../widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const AlertBox = dynamic(() => import('../../global/commonComponents/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('../../includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const BackToTopButton = dynamic(() => import('../../includes/BackToTopButton/BackToTopButton'), {ssr: false});

const HeaderStyle = styled.header`
 
`
interface AppLayoutInitializerPropTypes {
    children:React.ReactNode
}

const AppLayoutInitializer: FC<AppLayoutInitializerPropTypes> = ({children}) => {
    const dispatch = useAppDispatch();
    const {
        loggedIn,
        userRole,
        identity,
        cookiePopupMessage,
        loginRegisterFormPopup,
        alert,
        isLoading
    } = useSelector(({user, settings, globalState}: Store) => {
        return {
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
            identity: settings?.identity,
            isLoading:globalState?.loading,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup,
            alert: globalState?.alert,
            cookiePopupMessage: settings?.identity?.cookiePopupMessage
        }
    });

    const closeClientAlert = ()=>{
        dispatch(closeAlert(null))
    }

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

            <Loading isLoading={isLoading}/>

            {(typeof window !== 'undefined' && !!cookiePopupMessage && localStorage.cookieAccepted !== 'true') &&
            <CookiePopup/>
            }

            {loginRegisterFormPopup && !loggedIn && <LoginRegisterPopup/>}
            <AlertBox alert={alert} closeAdminpanelAlert={closeClientAlert}/>
            {userRole === 'administrator' && <AppLayoutAdminDataInitializer/>}
            {userRole === 'administrator' && <AdminTools/>}
            <GlobalStylesComponent/>
            <SiteSettingSetter/>
        </>
    )
};
export default AppLayoutInitializer;
