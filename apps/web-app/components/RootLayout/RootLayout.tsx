import React, {FC, useEffect, useState} from 'react';
import Loading from "../global/commonComponents/Loading/Loading";
import dynamic from "next/dynamic";
import RootLayoutAdminDataInitializer from "./RootLayoutAdminDataInitializer";
import {setAdminMode} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import GlobalStyles from "@components/global/Styles/GlobalStyles";
import GoogleAnalytics from "@components/includes/SiteSettingsSetter/GoogleAnalytics";
import socket from 'web-socket-client';
import MediaCall from "@components/global/commonComponents/mediaCall/MediaCall";
import SocketEventHandler from "@components/global/commonComponents/SocketEventHandler";

const UserAutoLogin = dynamic(() => import('@components/includes/SiteSettingsSetter/UserAutoLogin'));
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
    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const [renderCookiesBar, setRenderCookiesBar] = useState(false)

    const {loggedIn,userData} = useAppSelector(({user}) => user)
    const {loginRegisterFormPopup, alert, loading, adminMode} = useAppSelector(({globalState}) => globalState)
    const {initialSettings} = useAppSelector(({settings}) => settings)
    const {mediaCall} = useAppSelector(({mediaConnection}) => mediaConnection)
    const {customColors, customStyles} = useAppSelector(({settings}) => settings?.initialSettings?.layoutSettings ?? {})

    useEffect(() => {
        setTimeout(() => {
            if (typeof window === 'undefined') return

            if (!!localStorage?.wt) {
                setRenderAutoLogin(true)
            }

            if (localStorage?.cookieAccepted !== 'true') {
                setRenderCookiesBar(true)
            }

        }, 10)
    }, []);

    useEffect(() => {
        if (loggedIn && !!userData?._id) {
            socket.emit('userSignedIn', {userId: userData._id});
        }
    }, [loggedIn]);


    useEffect(() => {
        setTimeout(() => {
            if (userData?.role === 'administrator' && localStorage?.adminMode === 'true') {
                dispatch(setAdminMode(true))
            }
        }, 500)
    }, [userData]);



    return (

        <>

            {renderAutoLogin ? <UserAutoLogin renderAutoLogin={renderAutoLogin}/> : null}
            {!!initialSettings?.layoutSettings?.topbar && <TopBarWidgetArea/>}
            {!!initialSettings?.layoutSettings?.header && <HeaderWidgetArea/>}
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
            {adminMode && <RootLayoutAdminDataInitializer/>}
            <GlobalStyles customColors={customColors} customStyles={customStyles}/>
            {!!initialSettings?.headDataSettings?.googleAnalyticsId &&
                <GoogleAnalytics googleAnalyticsId={initialSettings?.headDataSettings?.googleAnalyticsId}/>}

            {loggedIn && <SocketEventHandler/>}
            {(loggedIn && mediaCall) && <MediaCall/>}
        </>

    );
};

export default RootLayout;

