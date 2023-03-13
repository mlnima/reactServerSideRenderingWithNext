import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Loading from "../../global/commonComponents/Loading/Loading";
import GlobalStylesComponent from "../../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../../includes/SiteSettingsSetter/SiteSettingsSetter";
import dynamic from "next/dynamic";
import AppLayoutAdminDataInitializer from "./AppLayoutAdminDataInitializer";
import {setAdminMode} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

const FooterWidgetArea = dynamic(() => import('../../widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('../../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const HeaderWidgetArea = dynamic(() => import('../../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('../../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const AlertBox = dynamic(() => import('../../global/commonComponents/AlertBox/AlertBox'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const BackToTopButton = dynamic(() => import('../../includes/BackToTopButton/BackToTopButton'), {ssr: false});


interface AppLayoutPropTypes {
    children: React.ReactNode,
    rest: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {
    const dispatch = useAppDispatch()
    const {loggedIn} = useSelector(({user}: Store) => user)
    const {userData} = useSelector(({user}: Store) => user)
    const [renderCookiesBar, setRenderCookiesBar] = useState(false)

    const {loginRegisterFormPopup, alert, loading, adminMode} = useSelector(({globalState}: Store) => globalState)
    const {initialSettings} = useSelector(({settings}: Store) => settings)

    useEffect(() => {
        setTimeout(() => {
            if (localStorage?.cookieAccepted !== 'true') {
                setRenderCookiesBar(true)
            }
        }, 10)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if ( userData?.role === 'administrator' && localStorage?.adminMode === 'true') {
                dispatch(setAdminMode(!adminMode))
            }
        }, 20)
    }, [userData]);

    return (
        <>
            {!!initialSettings?.layoutSettings?.topbar && <TopBarWidgetArea/>}
            {!!initialSettings?.layoutSettings?.header  && <HeaderWidgetArea/>}
            {!!initialSettings?.layoutSettings?.navigation && <NavigationWidgetArea/>}

            <div id={'page'} className={'App'}>
                {children}
            </div>

            {!!initialSettings?.layoutSettings?.footer && <FooterWidgetArea/>}
            <BackToTopButton/>

            <Loading isLoading={loading}/>

            {renderCookiesBar && <CookiePopup/>}

            {loginRegisterFormPopup && !loggedIn && <LoginRegisterPopup/>}
            <AlertBox alert={alert}/>
            {!!adminMode && <AppLayoutAdminDataInitializer/>}

            <GlobalStylesComponent/>
            <SiteSettingSetter/>
        </>
    );
};

export default AppLayout;

