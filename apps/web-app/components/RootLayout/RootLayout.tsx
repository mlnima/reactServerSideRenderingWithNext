import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Loading from "../global/commonComponents/Loading/Loading";
import GlobalStylesComponent from "../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import dynamic from "next/dynamic";
import RootLayoutAdminDataInitializer from "./RootLayoutAdminDataInitializer";
import {setAdminMode} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

const TopBarWidgetArea = dynamic(() => import('./widgetsArea/TopBarWidgetArea'));
const HeaderWidgetArea = dynamic(() => import('./widgetsArea/HeaderWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('./widgetsArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('./widgetsArea/FooterWidgetArea'));

const AlertBox = dynamic(() => import('../global/commonComponents/AlertBox/AlertBox'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('./common/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('./common/CookiesInformerBar'), {ssr: false});
const BackToTopButton = dynamic(() => import('./common/BackToTopButton'), {ssr: false});


interface RootLayoutPropTypes {
    children: React.ReactNode,
    rest: any
}

const RootLayout: FC<RootLayoutPropTypes> = ({children}) => {
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
            {!!adminMode && <RootLayoutAdminDataInitializer/>}

            <GlobalStylesComponent/>
            <SiteSettingSetter/>
        </>
    );
};

export default RootLayout;

