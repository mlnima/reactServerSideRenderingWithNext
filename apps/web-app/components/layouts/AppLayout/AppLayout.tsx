import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Loading from "../../global/commonComponents/Loading/Loading";
import GlobalStylesComponent from "../../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../../includes/SiteSettingsSetter/SiteSettingsSetter";
import dynamic from "next/dynamic";
import AppLayoutAdminDataInitializer from "./AppLayoutAdminDataInitializer";
import {closeAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import AppLayoutHeader from "@components/layouts/AppLayout/AppLayoutHeader";

const FooterWidgetArea = dynamic(() => import('../../widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const AlertBox = dynamic(() => import('../../global/commonComponents/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('../../includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const BackToTopButton = dynamic(() => import('../../includes/BackToTopButton/BackToTopButton'), {ssr: false});


interface AppLayoutPropTypes {
    children: React.ReactNode,
    rest: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {
    const dispatch = useAppDispatch();

    const {loggedIn,userRole} = useSelector(({user}: Store)=>{
        return{
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
        }
    })

    const {loginRegisterFormPopup,alert,isLoading} = useSelector(({globalState}: Store)=>{
        return{
            alert: globalState?.alert,
            isLoading:globalState?.loading,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup
        }
    })

    const {identity, cookiePopupMessage} = useSelector(({settings}: Store) => {
        return {
            identity: settings?.identity,
            cookiePopupMessage: settings?.identity?.cookiePopupMessage
        }
    });

    const closeClientAlert = ()=>{
        dispatch(closeAlert(null))
    }

    return (
        <>
            <AppLayoutHeader/>

            <div id={'page'} className={'App'}>
                {children}
            </div>

            {(identity?.footer === 'enable' || identity?.footer === undefined) && <FooterWidgetArea/>}
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
    );
};

export default AppLayout;

