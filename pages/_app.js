import React, {useEffect} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";

const AppLayout = dynamic(() => import('../components/layouts/AppLayout'))
const LoginRegisterPopup = dynamic(() => import('../components/includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false})
const AdminLayout = dynamic(() => import('../components/layouts/AdminLayout'))
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout'), {ssr: false})
const AppProvider = dynamic(() => import('../context/AppContext'))
import * as Scroll from 'react-scroll';
import '../styles/styles.scss';
import '../styles/globalAdminPanel.scss';
import '../components/widgetsArea/WidgetArea/WidgetArea.scss';
import '../components/includes/checkOutPageComponents/CheckoutPop/CheckoutPop.scss';
import CookiePopup from "../components/includes/ClientPopActionRequest/CookiePopup";



const MyApp = ({Component, pageProps}) => {
    const router = useRouter()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
    }, [pageProps]);

    if (router.pathname.includes('/admin')) {
        return (
            <AppProvider>
                <AdminLayout>
                    <Component {...pageProps} />
                </AdminLayout>
                <style global jsx>{`
                    :root{
                      --admin-color-8:#282828;
                      --admin-color-0:#fff;
                      --admin-light-blue-color:#0085ba;
                    }
                 `}</style>
            </AppProvider>
        )
    } else if (router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')) {
        return (
            <AppProvider>
                <MessengerLayout
                    identity={pageProps.identity}
                    design={pageProps.design}
                    isMobile={pageProps.isMobile}
                    globalStyleDetected={!!pageProps.design?.data?.customStyles}
                >
                    <Component {...pageProps} />
                </MessengerLayout>
                <LoginRegisterPopup/>
            </AppProvider>
        )
    } else return (
        <AppProvider>

            <AppLayout
                design={pageProps.design}
                widgets={pageProps.widgets}
                identity={pageProps.identity}
                eCommerce={pageProps.eCommerce}
                referer={pageProps.referer}
                isMobile={pageProps.isMobile}
                globalStyleDetected={!!pageProps.design?.data?.customStyles}
                pageInfo={pageProps.pageInfo}
            >
                <Component {...pageProps} />
            </AppLayout>
            <LoginRegisterPopup/>
            <CookiePopup identity={pageProps.identity}/>
        </AppProvider>
    )
};

export default MyApp;

// <PwaInstallButton/>

// <RedirecterToHttps identity={pageProps.identity}/>
// <RedirectToHTTPS identity={pageProps.identity}/>